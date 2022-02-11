import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "urql";

const GetProductById = `
  query GetProductById($id: ID!) { 
    findProductByID(id: $id) { 
      _id
      name
      price
      image
    }
  }
`

const UpdateProduct = `
  mutation UpdateProduct($id: ID!, $name: String!, $price: Float!, $image: String) {
    updateProduct(id: $id, data: {
      name: $name
      price: $price
      image: $image
    }) {
      _id
      name
      image
      price
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

  const [record, _getRecordQuery] = useQuery({
    query: GetProductById,
    variables: { id: router.query.id },
  });

  const [updateProductResult, updateProduct] = useMutation(UpdateProduct);


  useEffect(() => {
    if(record?.data) {
      console.log(record.data);
      setState({
        name: record.data?.findProductByID.name,
        price: record.data?.findProductByID.price,
        image: record.data?.findProductByID.image,
      })
    }
  }, [record])

  const handleChange = e => { 
    setState({
      ...state,
      [e.target.name]: e.target.value,
    })
  }

  const submitform = e => {
    e.preventDefault();

    updateProduct({
      ...state,
      id: router.query.id,
      price: parseFloat(state.price),
    });
  }

  return (
    <div className="container">
      <div className="column is-four-fifths">
        <h1 className="title is-4">Update Product</h1>
        {record.fetching ? <p>Loading...</p> : null}


        {
          updateProductResult.error ? (
            <div className="notification is-danger">
              You are not allowed to modify this product.
            </div>
          ) : null
        }
        {
          updateProductResult.data ? (
            <div className="notification is-success">
              Successfully updated the product.
            </div>
          ) : null
        }

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
              value={state.price}
              name="price"
              className="input is-primary"
              onChange={handleChange}
            />
          </label>
          <label>Image
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