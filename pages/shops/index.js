import Link from "next/link";
import styles from '../../styles/Stores.module.css';

export default function MyShops() {
  return (
    <div className="container">
      <Link href="/shops/new">
        <a className="button is-success">Create a new shop</a>
      </Link>
      <h1 className="title is-4">My Shops</h1>
      <div className="tile is-ancestor">
        <div className="tile is-4 is-vertical is-parent">
          <div className="tile is-child box">
            <p className="title">One</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <div className={styles.buttonWrap}>
              <Link href="/">
                <a className="button is-success is-light">Add Items</a>
              </Link>

              <Link href="/">
                <a className="button is-warning is-light">Edit Store</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}