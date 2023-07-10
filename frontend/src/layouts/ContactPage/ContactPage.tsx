export const ContactPage = () => {
  return (
    <div className="contact">
      <div className="container-fluid py-5">
        <div className="row">
          <div className="col-md-6 d-flex flex-column justify-content-center">
            <h2>Contact Us</h2>
            <p className="me-5">
              Have a question or feedback? We would love to hear from you.
              Please fill out the form and we'll get back to you as soon as
              possible.
            </p>
          </div>
          <div className="col-md-6">
            <form
              className="p-4 border rounded shadow"
              action="mailto:mingyueees@gmail.com"
              method="POST"
              encType="multipart/form-data"
            >
              <div className="form-group mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="message" className="form-label">
                  Message
                </label>
                <textarea
                  id="message"
                  className="form-control"
                  rows={4}
                  required
                />
              </div>
              <div className="d-grid gap-2">
                <button type="submit" className="btn">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
