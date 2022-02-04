import Link from "next/link";
import { useRouter } from "next/router";

const Navbar = () => { 
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
            <Link href="/api/auth/login">
            <a className="button is-primary" >
              Log in
            </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </nav>
  )
}

export default Navbar;