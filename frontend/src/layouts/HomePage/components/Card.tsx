export const Card = () => {
  return (
    <a href="#" className="card border-0 text-decoration-none">
      <img
        src="images/products/adicolor-classics-joggers.png"
        className="card-img-top rounded-0"
        alt="Adicolor Classics Joggers"
      />
      <div className="card-body rounded-0">
        <h5 className="card-title fs-6">Adicolor Classics Joggers</h5>
        <p className="card-text d-flex justify-content-between">
          <small className="text-body-secondary">Dress</small>
          <span>$63.85</span>
        </p>
      </div>
    </a>
  );
};
