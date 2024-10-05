import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import RelatedProduct from './RelatedProduct'


const ProductDetail = () => {
    const {id} = useParams();

    const url = "http://localhost:1000/api";
    const[product , setproduct]=useState([]);

    useEffect(() => {
      const fetchProduct = async () => {
        try {
          const api = await axios.get(`${url}/product/${id}`, {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true, // To handle cookies and credentials
          });
          // Log the entire response to check structure
        //   console.log(api.data.product);
          setproduct(api.data.product);
        } catch (error) {
          // Log any error in the console
          console.error("Error fetching products:", error);
        }
      };
      // Call the fetchProduct function
      fetchProduct();
    }, [id]); // useEffect with empty dependency array to run once
    
  return (
 <>
 <div className="container text-center my-5" style={{display:'flex' ,  justifyContent:"space-evenly"
    ,alignItems:"center"
 }}>
    <div className="left">
        <img src={product?.imgsrc} alt="" style={{width:'300px', height:'300px' , borderRadius
            :'10px', border:'2px solid yellow' , padding:'10px'
        }} />
    </div>
    <div className="right">
        <h1>{product?.title}</h1>
        <p>{product?.discription}</p>
        <h1>{`₹ `}{product?.price}</h1>
        {/* <h3>{product.catorgory}</h3> */}
        <div className='my-5'>
            <button className="btn btn-danger mx-3" style={{fontWeight:"bold"}}>Buy now</button>
            <button className="btn btn-warning" style={{fontWeight:"bold"}}>Add to Cart</button>

        </div>
    </div>
 </div>
  {/* show related product */}
      <RelatedProduct catorgory={product?.catorgory} />
 </>
  )
}

export default ProductDetail