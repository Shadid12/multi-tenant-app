import Link from "next/link";
import styles from '../styles/Stores.module.css';

export default function StoreItem({ store }) {
  console.log('store', store);
  return (
    <div className="tile is-child box">
      <p className="title">{store.name}</p>
      <p>
        {store.category.join(', ')}
        <div className={styles.buttonWrap}>
          <Link href="/">
            <a className="button">View Store Items</a>
          </Link>
        </div>
      </p>
      <div className={styles.buttonWrap}>
        <Link href={`/shops/${store._id}/add-item`}>
          <a className="button is-success is-light">Add Items</a>
        </Link>

        <Link href="/">
          <a className="button is-warning is-light">Edit Store</a>
        </Link>
        
      </div>
    </div>
  )
}