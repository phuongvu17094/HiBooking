import "./List2.css";
import Navbar from "../../../components/navbar/Navbar";
import Header from "../../../components/header/Header";
import SearchItem from "../../../components/searchItem/SearchItem";
import useFetch from "../../../Hooks/useFetch";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const List = () => {
  <FontAwesomeIcon icon="fa-solid fa-chevron-left" />
  
  const location = useLocation();
  const type = location.pathname.split("/")[2];
  console.log(type)

  const { data, loading, error, reFetch } = useFetch(
    `https://mern-booking-web.onrender.com/api/hotels?type=${type}`
  );
  console.log(data);

  const handleClicked = () => {
    reFetch();
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <Link to="/" style={{color: "black"}}>
      <FontAwesomeIcon style={{margin: "10px 0 0 10px"}} icon={faChevronLeft}/>
      </Link>
          <div className="listResult">
            {loading ? (
              "Loading"
            ) : (
              <>
                {data.map((item) => (
                  <SearchItem item={item} key={item._id} />
                ))}
              </>
            )}
          </div>
        </div>
  );
};

export default List;
