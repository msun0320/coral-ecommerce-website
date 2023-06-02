export const Footer = () => {
  return (
    <footer className="text-center pt-3 pt-md-5">
      <section className="">
        <div className="container text-center text-md-start mt-5">
          <div className="row mt-3">
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <h6 className="text-uppercase fs-4 fw-bold mb-4">
                Coral
                <img src="images/logo-coral.svg" className="ms-2" alt="Coral" />
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
                  <img src="images/icons/icon-facebook.svg" alt="Facebook" />
                </a>
                <a
                  href="https://twitter.com/"
                  className="me-4 text-reset"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src="images/icons/icon-twitter.svg" alt="Twitter" />
                </a>
                <a
                  href="https://www.linkedin.com/"
                  className="me-4 text-reset"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src="images/icons/icon-linkedin.svg" alt="LinkedIn" />
                </a>
                <a
                  href="https://www.instagram.com/"
                  className="text-reset"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src="images/icons/icon-instagram.svg" alt="Instagram" />
                </a>
              </div>
            </div>
            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Catalog</h6>
              <p>
                <a href="#" className="text-reset">
                  Necklaces
                </a>
              </p>
              <p>
                <a href="#" className="text-reset">
                  Hoodies
                </a>
              </p>
              <p>
                <a href="#" className="text-reset">
                  Jewelry Box
                </a>
              </p>
              <p>
                <a href="#" className="text-reset">
                  T-Shirt
                </a>
              </p>
              <p>
                <a href="#" className="text-reset">
                  Jacket
                </a>
              </p>
            </div>
            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">About us</h6>
              <p>
                <a href="#" className="text-reset">
                  Our Producers
                </a>
              </p>
              <p>
                <a href="#" className="text-reset">
                  Sitemap
                </a>
              </p>
              <p>
                <a href="#" className="text-reset">
                  FAQ
                </a>
              </p>
              <p>
                <a href="#" className="text-reset">
                  About Us
                </a>
              </p>
              <p>
                <a href="#" className="text-reset">
                  Terms & Conditions
                </a>
              </p>
            </div>
            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">CUSTOMER SERVICES</h6>
              <p>
                <a href="#" className="text-reset">
                  Contact Us
                </a>
              </p>
              <p>
                <a href="#" className="text-reset">
                  Track Your Order
                </a>
              </p>
              <p>
                <a href="#" className="text-reset">
                  Product Care & Repair
                </a>
              </p>
              <p>
                <a href="#" className="text-reset">
                  Book an Appointment
                </a>
              </p>
              <p>
                <a href="#" className="text-reset">
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
