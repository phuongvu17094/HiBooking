import express from "express";
import {
  countByCity,
  countByType,
  createHotel,
  deleteHotel,
  getAllHotels,
  getHotel,
  getHotelRooms,
  updateHotel,
} from "../controllers/hotels.js";
import { verifyAdmin } from "../utils/verify.js";

const router = express.Router();

//CREATE
router.post("/", verifyAdmin, createHotel);

//GET ALL
router.get("/", getAllHotels);

//GET
router.get("/find/:id", getHotel);

//UPDATE
router.put("/:id", verifyAdmin, updateHotel);

//DELETE
router.delete("/:id", verifyAdmin, deleteHotel);

router.get("/countByCity", countByCity);
router.get("/countByType", countByType);

router.get("/room/:id", getHotelRooms);


export default router;
