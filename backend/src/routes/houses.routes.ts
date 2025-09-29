import { Router } from "express";
import {addHousePictures,addHouses,deleteHouse,updateHouse,updateHousePictures,deleteHouseImg,getHouse,getAllHouses, deleteReview, addReview, getReviews, updateReview,} from "../controllers/houses.controller" 
export const houses = Router()
houses.post('/',addHouses)
houses.post('/pictures',addHousePictures)
houses.delete('/',deleteHouse)
houses.delete('/pictures', deleteHouseImg)
houses.patch('/',updateHouse)
houses.patch('/pictures',updateHousePictures)
houses.get('/:id',getHouse)
houses.get('/',getAllHouses)

// reviews
houses.post('/reviews', addReview);
houses.patch('/reviews', updateReview);
houses.delete('/reviews', deleteReview);
houses.get('/reviews/:id', getReviews);

