import express from "express"
import http from "http"
import path from "path"
import mongoose, {Model} from "mongoose";
import url from "url";
import bodyParser from "body-parser";
import {Place} from "./models/Place.js";
//import {Place} from "./models/Place";

const app = express();

const __filename = url.fileURLToPath(import.meta.url);
const dirname = path.dirname(path.dirname(__filename))

app.use(express.static(dirname + "/client"))
app.use(express.json({extended : true}))
//app.use(express.urlencoded())

mongoose.connect('mongodb://127.0.0.1:27017/parking');

app.listen(3000,() => {
  console.log(`Server working`)
})

app.get("/places.json", async (req, res) => {
  try{
    res.json(
      await Place
        .find()
        .exec()
    )
  } catch (e) {
    console.log(e);
  }

})

app.get("/organisedPlaces.json", async (req, res) => {
  try {
    var places = await Place
      .find()
      .exec()

    var arrayOfTags = [];
    places.forEach(place => {
      place.tags.forEach(tag => {
        if (arrayOfTags.indexOf(tag) == -1) {
          arrayOfTags.push(tag)
        }
      })
    })

    var tagObjects = arrayOfTags.map(tag => {
      var tagPlaces = [];
      places.forEach(place => {
        if (place.tags.indexOf(tag) !== -1) {
          tagPlaces.push(place.name)
        }
      });
      return {"name" : tag, "places" : tagPlaces};
    })

    res.json(tagObjects);
  } catch (e) {
    console.log(e);
  }
})

app.patch("/places/:name", async (req, res) => {
  try{
    var name = req.params.name;

    await Place
      .findOneAndUpdate({name : name}, [{ $set : {"isFree" : {$eq : [false, "$isFree"]}}}])
      .exec();

    res.send("OK")
  } catch (e) {
    res.send("NOT OK")
  }
})

app.post("/newPlace", (req, res) => {
  try{
    console.log(req.body);
    var body = req.body;
    var name = body.name;
    var tags = body.tags;
    Place.find({name : name }).exec().then( places => {
      if (places.length == 0) {
        var place = new Place({name: name, isFree: true, tags: tags});
        place.save();
        res.json({success: true, description: ""});
      } else {
        res.json({success: false, description: "Такое место уже есть"});
      }
    } )
  } catch (e) {
    console.log(e);
    res.json({success: false, description: "Ошибка на сервере"});
  }
})