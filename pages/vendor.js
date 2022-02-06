import Link from "next/link";


export default function Vendor() {
  return (
    <div className="container">
      <div className="columns is-gapless is-multiline is-mobile">
        <div className="column is-one-quarter">
          <Link href="/shops/new">
            <a className="button is-link">
              🏪 Create a shop
            </a>
          </Link>
        </div>
        <div className="column is-one-quarter">
          <Link href="/shops/new">
            <a className="button is-success">
              💰 View Sales 
            </a>
          </Link>
        </div>
      </div>
    </div>
  )
}