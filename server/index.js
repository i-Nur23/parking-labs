import express from "express"
import http from "http"
import path from "path"
import mongoose, {Model} from "mongoose";
import url from "url";
import {Place} from "./models/Place.js";
import {PlacesContoller} from "./controller/PlacesController.js";

const app = express();

const __filename = url.fileURLToPath(import.meta.url);
const dirname = path.dirname(path.dirname(__filename))

app.use(express.static(dirname + "/client"))
app.use(express.json({extended : true}))

const placesController = new PlacesContoller();

mongoose.connect('mongodb://127.0.0.1:27017/parking');

app.get("/places.json", placesController.GetAllPlaces)
app.get("/organisedPlaces.json", placesController.GetPlacesOrganizedByTags)
app.patch("/places/:name", placesController.ChangePlaceStatus)
app.post("/newPlace", placesController.AddNewPlace)

app.listen(3000,() => {
  console.log(`Server working`)
})