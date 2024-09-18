import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import "./reserve.css";
import useFetch from "../../Hooks/useFetch.js";
import { useContext, useEffect, useState } from "react";
import { searchContext } from "../../context/searchContext.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Reserve = ({ setOpen, hotelId }) => {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { data, loading, error } = useFetch(
    `https://mern-booking-web.onrender.com/api/hotels/room/${hotelId}`
  );
  const { dates } = useContext(searchContext);
  

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  //kiem tra phong co duoc dat chua
  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );

    return !isFound;
  };

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };

  const navigate = useNavigate();
  const notify = () => {
    toast.success('🦄 Successful booking!', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(
            `https://mern-booking-web.onrender.com/api/rooms/availability/${roomId}`,
            { dates: alldates }
          );
          return res.data;
        })
      );
      notify()
      setOpen(false);
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (err) {}
  };

  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span className="rChoice">Select your rooms:</span>
        {data.map((item) => (
          <div className="rItem" key={item._id}>
            <div className="rItemInfo">
              <div className="rTitle">{item.title}</div>
              <div className="rDesc">{item.desc}</div>
              <div className="rMax">
                Max people: <b>{item.maxPeople}</b>
              </div>
              <div className="rPrice">{item.price}</div>
            </div>
            <div className="rSelectRooms">
              {item.roomNumber.map((room) => (
                <div className="room">
                  <label>{room.number}</label>
                  <input
                    type="checkbox"
                    value={room._id}
                    onChange={handleSelect}
                    disabled={!isAvailable(room)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
       
        <button onClick={handleClick} className="rButton">
          Reserve Now!
        </button>
        <button  className="rClearButton">
          Clear Selected Rooms
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Reserve;
