import {Place} from "../models/Place.js";

export class PlacesContoller {
  GetAllPlaces = async (req, res) => {
    try{
      res.json(
        await Place
          .find()
          .exec()
      )
    } catch (e) {
      console.log(e);
    }

  }

  GetPlacesOrganizedByTags = async (req, res) => {
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
  }

  ChangePlaceStatus = async (req, res) => {
    try{
      var name = req.params.name;

      await Place
        .findOneAndUpdate({name : name}, [{ $set : {"isFree" : {$eq : [false, "$isFree"]}}}])
        .exec();

      res.send("OK")
    } catch (e) {
      res.send("NOT OK")
    }
  }

  AddNewPlace = (req, res) => {
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
  }
}

