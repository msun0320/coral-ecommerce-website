import { useEffect, useState } from "react";
import ProductModel from "../../models/ProductModel";
import { SpinnerLoading } from "../HomePage/Utils/SpinnerLoading";
import { ProductCard } from "../HomePage/components/ProductCard";
import { Pagination } from "../HomePage/Utils/Pagination";

export const ProductsPage = () => {
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);
  const [totalAmountOfProducts, setTotalAmountOfProducts] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState("");
  const [searchUrl, setSearchUrl] = useState("");
  const [categorySelection, setCategorySelection] =
    useState("Product category");

  useEffect(() => {
    const fetchProducts = async () => {
      const baseUrl: string = "http://localhost:8080/api/products";

      let url: string = "";

      if (searchUrl === "") {
        url = `${baseUrl}?page=${currentPage - 1}&size=${productsPerPage}`;
      } else {
        let searchWithPage = searchUrl.replace(
          "<pageNumber>",
          `${currentPage - 1}`
        );
        url = baseUrl + searchWithPage;
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseJson = await response.json();

      const responseData = responseJson._embedded.products;

      setTotalAmountOfProducts(responseJson.page.totalElements);
      setTotalPages(responseJson.page.totalPages);

      const loadedProducts: ProductModel[] = [];

      for (const key in responseData) {
        loadedProducts.push({
          id: responseData[key].id,
          title: responseData[key].title,
          price: responseData[key].price,
          description: responseData[key].description,
          quantity: responseData[key].quantity,
          category: responseData[key].category,
          img: responseData[key].img,
        });
      }

      setProducts(loadedProducts);
      setIsLoading(false);
    };
    fetchProducts().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
    window.scrollTo(0, 0);
  }, [currentPage, searchUrl]);

  if (isLoading) {
    return <SpinnerLoading />;
  }

  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }

  const searchHandleChange = () => {
    setCurrentPage(1);
    if (search === "") {
      setSearchUrl("");
    } else {
      setSearchUrl(
        `/search/findByTitleContaining?title=${search}&page=<pageNumber>&size=${productsPerPage}`
      );
    }
    setCategorySelection("Product category");
  };

  const categoryField = (value: string) => {
    setCurrentPage(1);
    if (
      value.toLowerCase() === "accessories" ||
      value.toLowerCase() === "men" ||
      value.toLowerCase() === "women"
    ) {
      setCategorySelection(value);
      setSearchUrl(
        `/search/findByCategory?category=${value}&page=<pageNumber>&size=${productsPerPage}`
      );
    } else {
      setCategorySelection("All");
      setSearchUrl(`?page=<pageNumber>&size=${productsPerPage}`);
    }
  };

  const indexOfLastProduct: number = currentPage * productsPerPage;
  const indexOfFirstProduct: number = indexOfLastProduct - productsPerPage;
  let lastItem =
    productsPerPage * currentPage <= totalAmountOfProducts
      ? productsPerPage * currentPage
      : totalAmountOfProducts;

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="py-3">
      <div className="container-fluid row">
        <div className="col-12 col-md-3">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search products..."
              aria-label="Search products..."
              aria-describedby="button-addon2"
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              className="btn"
              type="button"
              id="button-addon2"
              onClick={() => searchHandleChange()}
            >
              Search
            </button>
          </div>

          <div>
            <input
              type="radio"
              className="btn-check"
              name="options"
              id="option1"
              autoComplete="off"
            />
            <label
              className="btn"
              htmlFor="option1"
              onClick={() => categoryField("All")}
            >
              All
            </label>

            <input
              type="radio"
              className="btn-check"
              name="options"
              id="option1"
              autoComplete="off"
            />
            <label
              className="btn"
              htmlFor="option2"
              onClick={() => categoryField("Accessories")}
            >
              Accessories
            </label>

            <input
              type="radio"
              className="btn-check"
              name="options"
              id="option2"
              autoComplete="off"
            />
            <label
              className="btn"
              htmlFor="option3"
              onClick={() => categoryField("Men")}
            >
              Men
            </label>

            <input
              type="radio"
              className="btn-check"
              name="options"
              id="option3"
              autoComplete="off"
            />
            <label
              className="btn"
              htmlFor="option4"
              onClick={() => categoryField("Women")}
            >
              Women
            </label>
          </div>
        </div>

        <div className="col-12 col-md-9 bg-white">
          {totalAmountOfProducts > 0 ? (
            <>
              <div>
                <h5 className="my-3">
                  Showing {indexOfFirstProduct + 1}-{lastItem} of{" "}
                  {totalAmountOfProducts} results
                </h5>
              </div>
              <div className="product-grid d-grid gap-3">
                {products.map((product) => (
                  <ProductCard product={product} key={product.id} />
                ))}
              </div>
            </>
          ) : (
            <div>
              <h3 className="my-3">Can't find what you are looking for?</h3>
              <a type="button" className="btn" href="#">
                Contact Us
              </a>
            </div>
          )}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              paginate={paginate}
            />
          )}
        </div>
      </div>
    </div>
  );
};
