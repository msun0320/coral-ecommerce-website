import { Link, NavLink } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <button
          className="navbar-toggler me-3"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <Link className="navbar-brand fs-4" href="#" to="/home">
          CORAL <img src="images/logo-coral.svg" alt="Coral" />
        </Link>
        <div
          className="collapse navbar-collapse order-1 order-lg-0 text-center"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item mx-3">
              <NavLink className="nav-link" to="/home">
                Home
              </NavLink>
            </li>
            <li className="nav-item mx-3">
              <NavLink className="nav-link" to="/products">
                Products
              </NavLink>
            </li>
          </ul>
        </div>
        <ul className="navbar-nav ms-auto d-flex flex-row">
          <li className="nav-item">
            <a className="nav-link me-3 me-lg-0" href="#">
              Log in
            </a>
          </li>
          <li>
            <a className="nav-link" href="#">
              <img src="images/icons/icon-cart.svg" alt="Shopping cart" />
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
