import logo from "./../../logo.svg";
import facebook from "./../../assets/images/icon-facebook.svg";
import twitter from "./../../assets/images/icon-twitter.svg";
import linkedin from "./../../assets/images/icon-linkedin.svg";
import instagram from "./../../assets/images/icon-instagram.svg";
import { NavLink } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="text-center pt-3 pt-md-5">
      <section className="">
        <div className="container text-center text-md-start mt-5">
          <div className="row mt-3">
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <h6 className="text-uppercase fs-4 fw-bold mb-4">
                Coral
                <img src={logo} className="ms-2" alt="Coral" />
              </h6>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua
              </p>
              <div>
                <a
                  href="https://www.facebook.com/"
                  className="me-4 text-reset"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={facebook} alt="Facebook" />
                </a>
                <a
                  href="https://twitter.com/"
                  className="me-4 text-reset"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={twitter} alt="Twitter" />
                </a>
                <a
                  href="https://www.linkedin.com/"
                  className="me-4 text-reset"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={linkedin} alt="LinkedIn" />
                </a>
                <a
                  href="https://www.instagram.com/"
                  className="text-reset"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={instagram} alt="Instagram" />
                </a>
              </div>
            </div>
            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Catalog</h6>
              <p>
                <a href="#" className="text-reset text-decoration-none">
                  Necklaces
                </a>
              </p>
              <p>
                <a href="#" className="text-reset text-decoration-none">
                  Hoodies
                </a>
              </p>
              <p>
                <a href="#" className="text-reset text-decoration-none">
                  Jewelry Box
                </a>
              </p>
              <p>
                <a href="#" className="text-reset text-decoration-none">
                  T-Shirt
                </a>
              </p>
              <p>
                <a href="#" className="text-reset text-decoration-none">
                  Jacket
                </a>
              </p>
            </div>
            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">About us</h6>
              <p>
                <a href="#" className="text-reset text-decoration-none">
                  Our Producers
                </a>
              </p>
              <p>
                <a href="#" className="text-reset text-decoration-none">
                  Sitemap
                </a>
              </p>
              <p>
                <a href="#" className="text-reset text-decoration-none">
                  FAQ
                </a>
              </p>
              <p>
                <NavLink
                  to="/about"
                  className="text-reset text-decoration-none"
                >
                  About Us
                </NavLink>
              </p>
              <p>
                <a href="#" className="text-reset text-decoration-none">
                  Terms & Conditions
                </a>
              </p>
            </div>
            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">CUSTOMER SERVICES</h6>
              <p>
                <NavLink
                  to="/contact"
                  className="text-reset text-decoration-none"
                >
                  Contact Us
                </NavLink>
              </p>
              <p>
                <a href="#" className="text-reset text-decoration-none">
                  Track Your Order
                </a>
              </p>
              <p>
                <a href="#" className="text-reset text-decoration-none">
                  Product Care & Repair
                </a>
              </p>
              <p>
                <a href="#" className="text-reset text-decoration-none">
                  Book an Appointment
                </a>
              </p>
              <p>
                <a href="#" className="text-reset text-decoration-none">
                  Shipping & Returns
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
      <hr className="mb-0" />
      <div className="text-center p-4">Copyright © 2023 Coral.</div>
    </footer>
  );
};
