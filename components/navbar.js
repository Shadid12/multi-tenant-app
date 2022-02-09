import Link from "next/link";
import { useUser } from '@auth0/nextjs-auth0';
import { useSelector } from 'react-redux';

const Navbar = () => { 
  const { user } = useUser();
  const items = useSelector(state => state.cart.items);


  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <Link href="/">
            <a className="navbar-item">
              Home
            </a>
          </Link>
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              {
                user ? ( 
                  <>
                    <Link href="/cart">
                      <a className="button">{items.length} 🛒</a>
                    </Link>
                    <Link href="/shops">
                      <a className="button">Seller Profile</a>
                    </Link>
                    <Link href="/api/auth/logout">
                      <a className="button is-danger">Logout</a>
                    </Link>
                  </>
                ) : (
                  <Link href="/api/auth/login">
                    <a className="button is-primary" >
                      Log in
                    </a>
                  </Link>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;