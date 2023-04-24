import express from "express"
import http from "http"
import path from "path"
import mongoose, {Model} from "mongoose";
import url from "url";
import {Place} from "./models/Place.js";
import {PlacesContoller} from "./controller/PlacesController.js";
import {UsersController} from "./controller/UsersController.js";

const app = express();

const __filename = url.fileURLToPath(import.meta.url);
const dirname = path.dirname(path.dirname(__filename))

app.use('/',express.static(dirname + "/client"))
app.use('/user/:username/',express.static(dirname + "/client"))
app.use(express.json({extended : true}))

const placesController = new PlacesContoller();
const userController = new UsersController();

mongoose.connect('mongodb://127.0.0.1:27017/parking');

/*app.get("/places.json", placesController.GetAllPlaces)
app.get("/organisedPlaces.json", placesController.GetPlacesOrganizedByTags)
app.patch("/places/:name", placesController.ChangePlaceStatus)
app.post("/newPlace", placesController.AddNewPlace)*/

app.get("/user/:username/places/places.json", placesController.GetAllUserPlaces);
app.get("/user/:username/places/freePlaces.json", placesController.GetAllFreePlaces)
app.get("/user/:username/places/organisedPlaces.json", placesController.GetPlacesOrganizedByTags)
app.patch("/user/:username/places/:name", placesController.ChangePlaceStatus)
app.post("/user/:username/places/newPlace", placesController.AddNewPlace)

app.get("/user/:username/admin/users.json", userController.GetAll)
app.post("/user/:username/admin/users", userController.Add)
app.delete("/user/:username/admin/users/:id", userController.Delete)

app.listen(3000,() => {
  console.log(`Server working`)
})