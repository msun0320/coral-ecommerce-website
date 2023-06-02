export const Hero = () => {
  return (
    <div className="hero d-flex">
      <div className="container-fluid d-flex justify-content-center align-items-center">
        <div className="w-75">
          <h1>Collections</h1>
          <p className="w-75 my-md-4">
            You can explore and shop many differnt collection from various
            brands here.
          </p>
          <a type="button" className="btn mt-2" href="#">
            Shop Now
          </a>
        </div>
        <img
          className="d-none d-md-block"
          src="images/image-hero.png"
          alt="Hero background"
        />
      </div>
    </div>
  );
};
