import React from "react";
import "./featuredProperties.css";
import useFetch from "../Hooks/useFetch";
import { Link } from "react-router-dom";

const FeaturedProperties = () => {
  const { data, loading, error } = useFetch(
    "https://mern-booking-web.onrender.com/api/hotels?featured=true"
  );

  const limitedData = data && data.slice(0, 4);

  return (
    <div className="fp">
      {loading ? (
        "Loading"
      ) : (
        <>
          {limitedData &&
            limitedData.map((item) => (
              <div className="fpItem" key={item._id}>
                <Link
                  to={`/hotels/${item._id}`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <div><img src={item.photos[0]} alt="" className="fpImg" /></div>
                  <div className="details">
                    <span className="fpName">{item.name}</span>
                    <span className="fpCity">{item.city}</span>
                    <span className="fpPrice">
                      Starting from ${item.cheapestPrice}
                    </span>
                    <div className="fpRating">
                      <button>{item.rating}10</button>
                      <span>Excellent</span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default FeaturedProperties;
