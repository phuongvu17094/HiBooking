import {
  faBed,
  faCalendarDays,
  faCar,
  faPerson,
  faPlane,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Header.css";
import { DateRange } from "react-date-range";
import { useContext, useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { Link, useNavigate } from "react-router-dom";
import { searchContext } from "../../context/searchContext";
import { AuthContext } from "../../context/authContext";

const Header = ({ type }) => {
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [activeItem, setActiveItem] = useState("Stays");
  const navigate = useNavigate();
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const { dispatch } = useContext(searchContext);

  const handleSearch = () => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
    navigate("/hotels", {
      state: { destination, dates, options },
    });
  };

  const { user } = useContext(AuthContext);
  return (
    <>
      <div className="headerList">
        <Link to="/">
          <div
            className={`headerListItem ${
              activeItem === "Stays" ? "active" : ""
            }`}
            onClick={() => setActiveItem("Stays")}
          >
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
          </div>
        </Link>

        <div
          className={`headerListItem ${
            activeItem === "Flights" ? "active" : ""
          }`}
          onClick={() => setActiveItem("Flights")}
        >
          <FontAwesomeIcon icon={faPlane} />
          <span>
            <a href="https://flights-vn.gotogate.com/rf/start"> Flights</a>
          </span>
        </div>

        <div
          className={`headerListItem ${
            activeItem === "Car rentals" ? "active" : ""
          }`}
          onClick={() => setActiveItem("Car rentals")}
        >
          <Link to="/rentcar">
            <FontAwesomeIcon icon={faCar} />
            <span>Car rentals</span>
          </Link>
        </div>
        <div
          className={`headerListItem ${
            activeItem === "Attractions" ? "active" : ""
          }`}
          onClick={() => setActiveItem("Attractions")}
        >
          <FontAwesomeIcon icon={faBed} />
          <span>Attractions</span>
        </div>
        <div
          className={`headerListItem ${
            activeItem === "Airport taxis" ? "active" : ""
          }`}
          onClick={() => setActiveItem("Airport taxis")}
        >
          <FontAwesomeIcon icon={faTaxi} />
          <span>Airport taxis</span>
        </div>
      </div>
      <div
          className={
            type === "list" ? "headerListMode" : "header"
          }
        >
      <div className="header">
    
          {type !== "list" && (
            <div className="header-wrap" >
              <h1 className="headerTitle">
                A lifetime of discounts? It's Genius.
              </h1>
              <p className="headerDesc">
                Get rewarded for your travels - unlock instant savings of 10% or
                more with a free HiBooking account{" "}
              </p>
              {!user ? (
                <button className="headerBtn1">Sign in / Register</button>
              ): <button className="headerBtn1">Explore</button>}
              
              <div className="headerSearch">
                <div className="headerSearchItem">
                  <FontAwesomeIcon icon={faBed} className="headerIcon" />
                  <input
                    type="text"
                    placeholder="Where are you going?"
                    className="headerSearchInput"
                    onChange={(e) => setDestination(e.target.value)}
                    list="items"
                  />
                  <datalist id="items" className="datalist">
                    <option value="Ho Chi Minh">Ho Chi Minh</option>
                    <option value="ha long">ha long</option>
                    <option value="ha noi">ha noi</option>
                    <option value="phu quoc">phu quoc</option>
                    <option value="usa">usa</option>
                    
                  </datalist>
                  {openDate && <span onClick={() => setOpenDate(!openDate)} style={{background: "darkcyan", width: "30px", height:"30px", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center"}}>X</span>}
                </div>
                <div className="headerSearchItem">
                  <FontAwesomeIcon
                    icon={faCalendarDays}
                    className="headerIcon"
                  />
                  <span
                    onClick={() => setOpenDate(!openDate)}
                    className="headerSearchText"
                  >
                    {`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
                      dates[0].endDate,
                      "MM/dd/yyyy"
                    )}`}
                  </span>
              
                  {openDate && (
                    
                    <DateRange
                      editableDateInputs={true}
                      onChange={(item) => setDates([item.selection])}
                      moveRangeOnFirstSelection={false}
                      ranges={dates}
                      className="date"
                      minDate={new Date()}
                    />
                  )}
                </div>
                <div className="headerSearchItem">
                  <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                  <span
                    onClick={() => setOpenOptions(!openOptions)}
                    className="headerSearchText"
                  >{`${options.adult} adult - ${options.children} children - ${options.room} room`}</span>
                  {openOptions && (
                    <div className="options">
                      <div className="optionItem">
                        <span className="optionText">Adult</span>
                        <div className="optionCounter">
                          <button
                            disabled={options.adult <= 1}
                            className="optionCounterBtn"
                            onClick={() => handleOption("adult", "d")}
                          >
                            -
                          </button>
                          <span className="optionCounterNum">{`${options.adult}`}</span>
                          <button
                            className="optionCounterBtn"
                            onClick={() => handleOption("adult", "i")}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="optionItem">
                        <span className="optionText">children</span>
                        <div className="optionCounter">
                          <button
                            disabled={options.children <= 0}
                            className="optionCounterBtn"
                            onClick={() => handleOption("children", "d")}
                          >
                            -
                          </button>
                          <span className="optionCounterNum">{`${options.children}`}</span>
                          <button
                            className="optionCounterBtn"
                            onClick={() => handleOption("children", "i")}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="optionItem">
                        <span className="optionText">Room </span>
                        <div className="optionCounter">
                          <button
                            disabled={options.room <= 1}
                            className="optionCounterBtn"
                            onClick={() => handleOption("room", "d")}
                          >
                            -
                          </button>
                          <span className="optionCounterNum">{`${options.room}`}</span>
                          <button
                            className="optionCounterBtn"
                            onClick={() => handleOption("room", "i")}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="headerSearchItem">
                  <button className="headerBtn" onClick={handleSearch}>
                    Search
                  </button>
                </div>
              </div>{" "}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
