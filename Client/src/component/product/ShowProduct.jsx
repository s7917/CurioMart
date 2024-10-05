import React, { useContext } from "react";
import AppContext from "../../Context/AppContext";
import { Link } from "react-router-dom";
const ShowProduct = () => {
  const { products , filteredData , AddToCart } = useContext(AppContext);
  return (
    <>
    {/* show product */}
      <div className="cont d-flex justify-content-center align-items-center">
        <div className="row  container d-flex justify-content-center align-items-center my-5">
          {filteredData?.map((product) => (
            <div
              key={product._id}
              className=" my-3 col-md-3  d-flex justify-content-center align-items-center"
            >
              <div
                className="card bg-dark text-light text-center "
                style={{ width: `18rem` }}
              >
                <Link
                  to={`/product/${product._id}`}
                  className="d-flex justify-content-center align-items-center p-3"
                >
                  <img
                    src={product.imgsrc}
                    className="card-img-top"
                    alt="..."
                    style={{
                      width: `200px`,
                      height: `200px`,
                      borderRadius: `10px`,
                      border: `2px solid yellow`,
                    }}
                  />
                </Link>
                <div className="card-body">
                  <h3 className="card-title">{product.title}</h3>
    
                  <div className="my-3">
                    <button className="btn btn-primary mx-3">
                      {`₹ `}
                      {product.price}
                    </button>
                    <button className="btn btn-warning" onClick={()=>AddToCart(product._id, product.title, product.price, 1, product.imgsrc)}>Add to Cart</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    
    </>
  );
};

export default ShowProduct;
