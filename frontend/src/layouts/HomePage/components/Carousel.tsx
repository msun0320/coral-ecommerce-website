import { Card } from "./Card";

export const Carousel = () => {
  return (
    <div className="py-3 py-md-5">
      <div className="container">
        <div className="carousel-title mb-4 mb-md-5">
          <h2 className="text-center">Featured Products</h2>
        </div>
        {/* Mobile */}
        <div
          id="carouselMobile"
          className="carousel carousel-dark slide d-lg-none"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div className="card-group d-flex rounded-0">
                <Card />
                <Card />
              </div>
            </div>
            <div className="carousel-item">
              <div className="card-group d-flex">
                <Card />
                <Card />
              </div>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselMobile"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselMobile"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>

        {/* Desktop */}
        <div
          id="carouselDesktop"
          className="carousel carousel-dark slide d-none d-lg-block"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div className="card-group">
                <Card />
                <Card />
                <Card />
                <Card />
              </div>
            </div>
            <div className="carousel-item">
              <div className="card-group">
                <Card />
                <Card />
                <Card />
                <Card />
              </div>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselDesktop"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselDesktop"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>
  );
};
