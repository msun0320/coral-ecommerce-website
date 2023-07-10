import { useEffect, useState } from "react";
import ProductModel from "../../models/ProductModel";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { ProductCard } from "../Utils/ProductCard";
import { Pagination } from "../Utils/Pagination";

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
  const [categorySelection, setCategorySelection] = useState("");

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

      const responseData = responseJson.content;

      setTotalAmountOfProducts(responseJson.totalElements);
      setTotalPages(responseJson.totalPages);

      const loadedProducts: ProductModel[] = [];

      for (const key in responseData) {
        loadedProducts.push({
          id: responseData[key].id,
          name: responseData[key].name,
          price: responseData[key].price,
          description: responseData[key].description,
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

  const searchHandleChange = (e: any) => {
    e.preventDefault();
    setCurrentPage(1);
    if (search === "") {
      setSearchUrl("");
    } else {
      setSearchUrl(
        `/search?name=${search}&page=<pageNumber>&size=${productsPerPage}`
      );
    }
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
        `/category/${value}?page=<pageNumber>&size=${productsPerPage}`
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
          <form className="d-flex" onSubmit={searchHandleChange}>
            <input
              type="text"
              className="form-control rounded-0"
              placeholder="Search products..."
              aria-label="Search products..."
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="btn" type="submit">
              Search
            </button>
          </form>

          <div className="d-flex flex-md-column my-2">
            <div>
              <input
                type="radio"
                className="btn-check"
                name="options"
                id="option1"
                autoComplete="off"
              />
              <label
                className="btn btn-reverse"
                htmlFor="option1"
                onClick={() => categoryField("All")}
              >
                All
              </label>
            </div>

            <div>
              <input
                type="radio"
                className="btn-check"
                name="options"
                id="option4"
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

            <div>
              <input
                type="radio"
                className="btn-check"
                name="options"
                id="option3"
                autoComplete="off"
              />
              <label
                className="btn"
                htmlFor="option3"
                onClick={() => categoryField("Men")}
              >
                Men
              </label>
            </div>

            <div>
              <input
                type="radio"
                className="btn-check"
                name="options"
                id="option2"
                autoComplete="off"
              />
              <label
                className="btn"
                htmlFor="option2"
                onClick={() => categoryField("Accessories")}
              >
                Accessories
              </label>
            </div>
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
