import React, { useContext, useState } from "react";
import AppContext from "../Context/AppContext";
import { Link, useLocation, useNavigate } from "react-router-dom";


const Navebar = () => {
  const [searchTerm, setsearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { SetFilteredData, products, Logout, isAuthenticated  ,cart} =
    useContext(AppContext);
    // console.log("hii" ,cart);

  const FilterByCategory = (cat) => {
    SetFilteredData(
      products.filter(
        (data) => data.catorgory?.toLowerCase() == String(cat)?.toLowerCase()
      )
    );
  };

  const FilterByprice = (prc) => {
    SetFilteredData(products?.filter((data) => data?.price == prc));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/product/search/${searchTerm}`);
    setsearchTerm("");
  };
  return (
    <>
      <div className="nav sticky-top">
        <div className="nav_bar">
          {/* it contain three things */}
          <Link
            to={"/"}
            className="left"
            style={{ textDecoration: "none", color: "white" }}
          >
            <h3>CurioMart</h3>
          </Link>
          <form className="search_bar" onSubmit={submitHandler}>
            <span className="material-symbols-outlined">search</span>{" "}
            <input
              value={searchTerm}
              onChange={(e) => setsearchTerm(e.target.value)}
              type="text"
              placeholder="search Products....."
            />
          </form>
          <div className="right">
            {isAuthenticated && (
              <>
                <Link to={'/cart'} type="button" className="btn btn-primary position-relative mx-3">
                <span className="material-symbols-outlined ">shopping_cart</span>
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {cart?.length}
                    <span className="visually-hidden">unread messages</span>
                  </span>
                </Link>
                <Link to={"/profile"} className="btn btn-info mx-3">
                  Profile
                </Link>
                <button
                  className="btn btn-danger mx-3"
                  onClick={() => {
                    Logout();
                    navigate("/");
                  }}
                >
                  Logout
                </button>
              </>
            )}

            {!isAuthenticated && (
              <>
                <Link to={"/login"} className="btn btn-secondary mx-3">
                  Login
                </Link>
                <Link to={"/register"} className="btn btn-info mx-3">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
        {location.pathname == "/" && (
          <div className="sub_bar">
            <div className="items" onClick={() => SetFilteredData(products)}>
              No Filter
            </div>
            <div className="items" onClick={() => FilterByCategory("mobile")}>
              Mobiles
            </div>
            <div className="items" onClick={() => FilterByCategory("laptops")}>
              Laptops
            </div>
            <div
              className="items"
              onClick={() => FilterByCategory("headphone")}
            >
              Headphone
            </div>
            <div className="items" onClick={() => FilterByCategory("watch")}>
              Smart Watch
            </div>
            <div className="items" onClick={() => FilterByCategory("camera")}>
              Camera's
            </div>
            <div className="items" onClick={() => FilterByCategory("bottles")}>
              bottles
            </div>
            <div className="items" onClick={() => FilterByprice(2000)}>
              ₹2000
            </div>
            <div className="items" onClick={() => FilterByprice(100)}>
              ₹100
            </div>
            <div className="items" onClick={() => FilterByprice(2000000)}>
              {" "}
              ₹20000
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Navebar;
