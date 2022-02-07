import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMutation } from "urql";

const CreateNewProduct = `
  mutation CreateNewProduct(
      $name: String!,
      $image: String!,
      $price: Float!,
      $storeId: ID!,
    ) {
    createProduct(data: {
      name: $name,
      image: $image,
      price: $price
      store: {
        connect: $storeId
      }
    }) {
      _id
      name
    }
  }
`

export default function AddShopItem() {
  const router = useRouter();
  const [state, setState] = useState({
    name: '',
    price: '',
    image: '',
  });

  const [{fetching, data, error}, executeMutation] = useMutation(CreateNewProduct);

  useEffect(() => {
    if(data?.createProduct) {
      alert('Successfully created a new product');
      router.push('/shops');
    }
  }, [data])

  const handleChange = e => { 
    setState({
      ...state,
      [e.target.name]: e.target.value,
    })
  }

  const submitform = e => {
    e.preventDefault();

    executeMutation({
      ...state,
      price: parseFloat(state.price),
      storeId: router.query.id,
    });
  }
  return (
    <div className="container">
      <div className="column is-four-fifths">
        <h1>Create new product</h1>
        {fetching ? <p>Loading...</p> : null}
        <form onSubmit={submitform}>
          <label>Product Name:
            <input
              type="text" 
              value={state.name}
              name="name"
              className="input is-primary"
              onChange={handleChange}
            />
          </label>
          <label>Price $
            <input
              type="number" 
              value={state.category}
              name="price"
              className="input is-primary"
              onChange={handleChange}
            />
          </label>
          <label>Image
            <input
              type="text" 
              value={state.category}
              name="image"
              className="input is-primary"
              onChange={handleChange}
            />
          </label>
          <div style={{ marginTop: '20px' }}>
            <button className="button is-primary">Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}