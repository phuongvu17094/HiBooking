import "./Hotel.css";
import Navbar from "../../../components/navbar/Navbar";
import Header from "../../../components/header/Header";
import MailList from "../../../components/mailList/MailList";
import Footer from "../../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
  faArrowLeft,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../../Hooks/useFetch";
import { searchContext } from "../../../context/searchContext";
import { AuthContext } from "../../../context/authContext";
import Reserve from "../../../components/Reserve/Reserve";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css";

const Hotel = () => {
  const location = useLocation();
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const [openDate, setOpenDate] = useState(false);
  const [dates1, setDates1] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const navigate = useNavigate();

  const id = location.pathname.split("/")[2];
  const { user } = useContext(AuthContext);

  const { data, loading, error } = useFetch(
    `https://mern-booking-web.onrender.com/api/hotels/find/${id}`
  );

  if (error) {
    console.error("Error fetching data:", error);
  }

  const { dates, options } = useContext(searchContext);

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  //const days = dayDifference(dates[0].endDate, dates[0].startDate);

  const days =
    dates && dates[0] ? dayDifference(dates[0].endDate, dates[0].startDate) : 0; // You might want to provide a default value if dates or dates[0] is undefined

  //xử lý khi người dùng click vào ảnh
  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  //xử lý tác vụ chuyển hình ảnh
  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  const handleClick = () => {
    if (user) {
      setOpenModal(true);
    } else {
      navigate("/login");
    }
  };

  const [showFullDesc, setShowFullDesc] = useState(false);

  const toggleDesc = () => {
    setShowFullDesc(!showFullDesc);
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <Link
        to="/"
        style={{ display: "flex", alignItems: "center", padding: "10px" }}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </Link>
      {loading ? (
        "Loading"
      ) : (
        <div className="hotelContainer">
          {open && (
            <div className="slider">
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="close"
                onClick={() => setOpen(false)}
              />
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className="arrow"
                onClick={() => handleMove("l")}
              />
              <div className="sliderWrapper">
                <img
                  src={data.photos[slideNumber]}
                  alt=""
                  className="sliderImg"
                />
              </div>
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className="arrow"
                onClick={() => handleMove("r")}
              />
            </div>
          )}
          <div className="hotelWrapper">
            {!days ? (
              <></>
            ) : (
              <button className="bookNow" onClick={handleClick}>
                Reserve or Book Now!
              </button>
            )}
            <h1 className="hotelTitle">{data.name}</h1>
            <div className="hotelAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data.address}</span>
            </div>
            <span className="hotelDistance">
              Excellent location – {data.distance}m from center
            </span>
            <span className="hotelPriceHighlight">
              Book a stay over ${data.cheapestPrice} at this property and get a
              free airport taxi
            </span>
            <div className="hotelImages">
              {data.photos?.map((photo, i) => (
                <div className="hotelImgWrapper" key={i}>
                  <img
                    onClick={() => handleOpen(i)}
                    src={photo}
                    alt=""
                    className="hotelImg"
                  />
                </div>
              ))}
            </div>
            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <h1 className="hotelTitle">{data.title}</h1>
                <p
                  className="hotelDesc"
                  style={{
                    maxHeight: showFullDesc ? "none" : "30vh",
                    overflow: "hidden",
                  }}
                >
                  {data.desc}
                </p>
                {!showFullDesc && (
                  <button onClick={toggleDesc}>Xem thêm</button>
                )}
                {showFullDesc && <button onClick={toggleDesc}>Ẩn bớt</button>}
              </div>
              <div
                className="hotelDetailsPrice"
                style={{ display: showFullDesc ? "none" : "flex" }}
              >
                <h1>Perfect for a {days}-night stay!</h1>
                <span>
                  Located in the real heart of Krakow, this property has an
                  excellent location score of 9.8!
                </span>
                {!days ? (
                  <Link to="/">
                    <h2>Select date to see price</h2>
                  </Link>
                ) : (
                  <>
                    <h2>
                      <b>${days * data.cheapestPrice * options.room}</b> ({days}{" "}
                      nights)
                    </h2>
                    <button onClick={handleClick}>Reserve or Book Now!</button>
                  </>
                )}
              </div>
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
                    {`${format(dates1[0].startDate, "MM/dd/yyyy")} to ${format(
                      dates1[0].endDate,
                      "MM/dd/yyyy"
                    )}`}
                  </span>
                  {openDate && (
                    <DateRange
                      editableDateInputs={true}
                      onChange={(item) => setDates1([item.selection])}
                      moveRangeOnFirstSelection={false}
                      ranges={dates}
                      className="date1"
                      minDate={new Date()}
                    />
                  )}
                </div>
          </div>
          <MailList />
          <Footer />
        </div>
      )}
      {openModal && <Reserve setOpen={setOpenModal} hotelId={id} />}
    </div>
  );
};

export default Hotel;
