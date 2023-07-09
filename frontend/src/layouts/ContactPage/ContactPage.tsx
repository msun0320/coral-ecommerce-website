export const ContactPage = () => {
  return (
    <div className="contact">
      <div className="container-fluid py-5">
        <div className="row">
          <div className="col-md-6 d-flex flex-column justify-content-center">
            <h2>Contact Us</h2>
            <p>
              Have a question or feedback? We would love to hear from you.
              Please fill out the form and we'll get back to you as soon as
              possible.
            </p>
          </div>
          <div className="col-md-6">
            <form
              action="mailto:mingyueees@gmail.com"
              method="POST"
              encType="multipart/form-data"
            >
              <div className="form-group mb-2">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Enter your name"
                />
              </div>

              <div className="form-group mb-2">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter your email"
                />
              </div>

              <div className="form-group mb-2">
                <label htmlFor="message">Message</label>
                <textarea
                  className="form-control"
                  id="message"
                  rows={4}
                  placeholder="Enter your message"
                />
              </div>

              <button type="submit" className="btn">
                Submit
              </button>
            </form>
          </div>
        </div>{" "}
      </div>
    </div>
  );
};
