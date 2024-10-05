import React, { useEffect, useState } from 'react'
import AppContext from '../../Context/AppContext'
import { useContext } from 'react'
import { Link , useParams } from 'react-router-dom'
Link

const SearchProduct = () => {
    const { products } = useContext(AppContext);
      const[searchProduct ,setSearchProduct]= useState([]);
      const {term} = useParams();


   useEffect(() => {
    setSearchProduct(products?.filter((data)=>data?.title?.toLowerCase().includes(term.toLocaleLowerCase())));
   }, [term , products])
   

  return (
    <>
    <div className="container text-center">
        <h1>search Results...... </h1>
        {/* for map related product */}
   

        <div className="cont d-flex justify-content-center align-items-center">
        <div className="row  container d-flex justify-content-center align-items-center my-5">
          {searchProduct?.map((product) => (
            <div
              key={product?._id}
               className=" my-3 col-md-3  d-flex justify-content-center align-items-center"
            >
              <div
                className="card bg-dark text-light text-center "
                style={{ width: `18rem` }}
              >
                <Link
                  to={`/product/${product?._id}`}
                  className="d-flex justify-content-center align-items-center p-3"
                >
                  <img
                    src={product?.imgsrc}
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
                  <h3 className="card-title">{product?.title}</h3>
    
                  <div className="my-3">
                    <button className="btn btn-primary mx-3">
                      {`₹ `}
                      {product.price}
                    </button>
                    <button className="btn btn-warning">Add to Cart</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
        

    </div>
    
    </>
  )
}

export default SearchProduct