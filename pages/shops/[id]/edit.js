import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "urql";
import { FindShopById } from './index';

const UpdateStore = `
  mutation UpdateShop($id: ID!, $name: String!, $category: [String!], $image: String) {
    updateStore(id: $id, data: {
      name: $name
      image: $image
      category: $category
    }) {
      _id
      image
      name
      category
    }
  }
`



export default function EditShop() {
  const router = useRouter();
  const [state, setState] = useState({
    name: '',
    category: '',
    image: '',
  });

  const [{fetching, data, error}, _] = useQuery({
    query: FindShopById,
    variables: { id: router.query.id },
  });

  const [_result, updateShop] = useMutation(UpdateStore);


  useEffect(() => {
    if(data?.findStoreByID) {
      setState({
        name: data.findStoreByID.name,
        category: data.findStoreByID.category.join(','),
        image: data.findStoreByID.image,
      });
    }
  }, [data])

  const handleChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }

  const submitform = e => {
    e.preventDefault();
    updateShop({
      id: router.query.id,
      name: state.name,
      category: state.category.split(','),
      image: state.image,
    }).then(data => {
      console.log('data', data);
      alert('Successfully updated store information');
      router.push('/shops');
    }).catch(err => {
      console.log(err);
     })
  }

  if(fetching) { 
    return <p>Loading...</p>;
  }

  if(error) { 
    return <p>{error.message}</p>;
  }

  return (
    <div className="container">
      <div className="column is-four-fifths">
        <form onSubmit={submitform}>
          <label>Store Name:
            <input
              type="text" 
              value={state.name}
              name="name"
              className="input is-primary"
              onChange={handleChange}
            />
          </label>
          <label>Category seperated by commas:
            <input
              type="text" 
              value={state.category}
              name="category"
              className="input is-primary"
              onChange={handleChange}
            />
          </label>
          <label>Cover Image:
            <input
              type="text" 
              value={state.image}
              name="image"
              className="input is-primary"
              onChange={handleChange}
            />
          </label>
          <div style={{ marginTop: '20px' }}>
            <button className="button is-info is-light">Update</button>
          </div>
        </form>
      </div>
    </div>
  )
}