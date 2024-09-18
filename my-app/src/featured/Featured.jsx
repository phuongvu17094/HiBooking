import React from "react";
import "./Featured.css";
import useFetch from "../Hooks/useFetch";


const Featured = () => {

  const { data, loading, error } = useFetch(
    "https://mern-booking-web.onrender.com/api/hotels/countByCity?cities=Ho Chi Minh,ha long,ha noi"
  );

  return (
    <div className="featured">
      {loading ? (
        "Loading please wait"
      ) : (
        <>
          <div className="featuredItem">
            <img
              src="https://kinhtevadubao.vn/stores/news_dataimages/anhptp/082022/08/16/3743_ho-chi-minh.jpg?rt=20220808163744"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Ho Chi Minh</h1>
              <h2>{data[0]} properties</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img
              src="https://media.baoquangninh.vn/dataimages/201904/original/images1283642_2.jpg"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Ha Long</h1>
              <h2>{data[1]} properties</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img
              src="https://vietnam.travel/sites/default/files/styles/top_banner/public/2017-06/vietnam-travel-5.jpg?itok=XVnHP3ty"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Ha Noi</h1>
              <h2>{data[2]} properties</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;
