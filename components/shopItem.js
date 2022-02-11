import Link from "next/link";
import styles from '../styles/Stores.module.css';

export default function ShopItem({ store }) {
  return (
    <div className="tile is-child box">
      <p className="title">{store.name}</p>
      <div>
        <img src={`${store.image}`} style={{ maxWidth: '200px' }}/>
      </div>
      <p>
        {store.category.join(', ')}
        <div className={styles.buttonWrap}>
          <Link href={`shops/${store._id}/products`}>
            <a className="button">View Products</a>
          </Link>
        </div>
      </p>
      <div className={styles.buttonWrap}>
        <Link href={`/shops/${store._id}/add-item`}>
          <a className="button is-success is-light">Add Products</a>
        </Link>

        <Link href={`/shops/${store._id}/edit`}>
          <a className="button is-warning is-light">Edit Store</a>
        </Link>
      </div>
    </div>
  )
}