export const AboutPage = () => {
  return (
    <div className="about">
      <div className="container-fluid py-5">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h2 className="section-title mb-4">About Us</h2>
            <p>
              Welcome to Coral! We're passionate about bringing you the best
              products and shopping experience possible. With a wide range of
              categories to choose from, we aim to fulfill all your needs and
              provide excellent customer service.
            </p>
            <p>
              Our mission is to make online shopping simple, convenient, and
              enjoyable for everyone. Whether you're looking for trendy fashion
              items, cutting-edge gadgets, home decor, or anything in between,
              we've got you covered.
            </p>
            <p>
              We carefully curate our product selection to ensure high quality
              and affordability. We're constantly updating our inventory with
              the latest and greatest products to keep you ahead of the curve.
            </p>
            <p>
              At our ecommerce store, we believe in providing exceptional
              customer service. Our dedicated support team is always ready to
              assist you with any questions or concerns you may have. Your
              satisfaction is our top priority, and we strive to exceed your
              expectations at every step.
            </p>
            <p>
              Thank you for choosing us as your preferred online shopping
              destination. We hope you enjoy your experience with us and find
              exactly what you're looking for. Happy shopping!
            </p>
          </div>
          <div className="col-md-6">
            <div className="image-wrapper d-flex justify-content-center">
              <img
                src="images/image-about-us.jpg"
                alt="About Us"
                className="img-fluid rounded align-self-center"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="featured-section bg-light py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h3 className="section-title mb-4">Our Vision</h3>
              <p>
                We envision a world where online shopping is not just a
                transaction, but an experience that brings joy and fulfillment
                to our customers. We strive to be the leading ecommerce platform
                that provides exceptional products, personalized
                recommendations, and unparalleled customer support.
              </p>
            </div>
            <div className="col-md-6">
              <h3 className="section-title mb-4">Our Values</h3>
              <ul className="list-unstyled">
                <li>
                  <strong>Quality</strong> - We are committed to offering only
                  the best products to our customers.
                </li>
                <li>
                  <strong>Customer Focus</strong> - Your satisfaction is our top
                  priority.
                </li>
                <li>
                  <strong>Innovation</strong> - We embrace innovation to provide
                  you with the latest trends and technologies.
                </li>
                <li>
                  <strong>Transparency</strong> - We believe in being
                  transparent and honest in our business practices.
                </li>
                <li>
                  <strong>Community</strong> - We value our customers and aim to
                  foster a vibrant and inclusive community.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
