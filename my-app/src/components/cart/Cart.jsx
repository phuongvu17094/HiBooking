import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookedRooms = () => {
  const [bookedRooms, setBookedRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookedRooms = async () => {
      try {
        const response = await axios.get("https://mern-booking-web.onrender.com/api/users/65a62cb4aec8d3e3257645c2", { withCredentials: true });
        console.log('API Response:', response.data);
        setBookedRooms(response.data.bookedRooms);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching booked rooms:', error);
        setLoading(false);
      }
    };

    fetchBookedRooms();
  }, []);

  console.log('Booked Rooms:', bookedRooms); // Add this line for debugging

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Booked Rooms</h2>
      <ul>
        {bookedRooms.map((room) => (
          <li key={room._id}>
            <h3>{room.title}</h3>
            <p>Price: {room.price}</p>
            <p>Max People: {room.maxPeople}</p>
            <p>Description: {room.desc}</p>
            <p>Room Numbers:</p>
            <ul>
              {room.roomNumber.map((roomNumber) => (
                <li key={roomNumber._id}>
                  Number: {roomNumber.number}
                  <p>Unavailable Dates:</p>
                  <ul>
                    {roomNumber.unavailableDates.map((date, index) => (
                      <li key={index}>{new Date(date).toLocaleDateString()}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookedRooms;
