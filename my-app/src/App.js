import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import List from "./pages/Home/list/List";
import Hotel from "./pages/Home/Hotel/Hotel";
import Login from "./pages/login/Login";
import List2 from "./pages/Home/list2/List2"
import Register from "./pages/register/Register";
import { userInputs } from "./formSource";
import RentCar from "./pages/RentCar/RentCar";
import Cart from "./components/cart/Cart.jsx"
import { useContext } from "react";
import { AuthContext } from "./context/authContext.js";
function App() {

  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<List/>} />
        <Route path="/hotelsType/:type" element={<List2 />} />
        <Route path="/hotels/:id" element={<Hotel />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register inputs={userInputs}/>}/>
        <Route path="/rentcar" element={<RentCar/>}/>
        <Route path="/cart" element={<Cart/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
