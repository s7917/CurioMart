import React, { useContext, useState ,useEffect} from 'react'
import AppContext from '../Context/AppContext'

const Cart = () => {
  const {cart ,decreaseQty}= useContext(AppContext)
  const[price , SetPrice] = useState(0);
  const[qty , SetQty] = useState(0);

  useEffect(()=>{
    let price = 0;  
    let qty = 0;
    if(cart){
      for(let i=0; i<cart.length; i++){
        qty += cart[i].qty;
        price += cart[i].price;
    }
    }
    SetPrice(price);
    SetQty(qty);
  },[cart])

  return (  
    <>
    <div className='my-5 text-center'>
      <button className="btn btn-info mx-3" style={{fontWeight:"bold",fontSize:"1.2rem"}}>Totel Qty:-{qty}</button>
      <button className="btn btn-warning mx-3" style={{fontWeight:"bold" ,fontSize:"1.2rem"}}>Totel Price:-{"Rs "}{price}</button>
    </div>
    {cart?.map((product)=> <div key={product._id}
    className='container bg-dark my-5 p-3 text-center'>
      <div style={{display:'flex', justifyContent:'space-around',alignItems:'center'}}>
        <div className="cart_img">
          <img src={product?.imgsrc} alt="" style={{width:"100px" , height:"100px",borderRadius:"10px"}} />
        </div>
        <div className="cart dis"><h2>Product:-{product.title}</h2>
        <h4>Price:-{product.price}</h4>
        <h4>Qty:-{product.qty}</h4>

        </div>
        <div className="cart_action ">
          <div className="button btn btn-warning mx-3" style={{fontWeight:'bold'}}
          onClick={()=>decreaseQty(product.productId._id,1)}>Qty--</div>
          <div className="button btn btn-info mx-3"  style={{fontWeight:'bold'}}>Qty++</div>
          <div className="button btn btn-danger mx-3 "  style={{fontWeight:'bold'}}>Remove item</div>
        </div>
      </div>

    </div>) }
    </>
  )
}

export default Cart