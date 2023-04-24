import {Place} from "../models/Place.js";
import {User} from "../models/User.js";

export class PlacesContoller {
  GetAllUserPlaces = async (req, res) => {
    try{
      var username = req.params.username || null;

      if (username !== null) {
        var user = await User.findOne({"username": username}).exec();
        if (user === null){
          res.status(404).json({"result" : user});
        } else {
          var places = await Place.find({owner : user._id, isFree : false}).exec();
          res.json(places);
        }
      } else {
        res.status(404).json({"username": username});
      }
    } catch (e) {
      console.log(e);
    }
  }

  GetAllFreePlaces = async (req, res) => {
    try {
      res.json(
        await Place
          .find({isFree: true})
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
      var username = req.params.username;
      var name = req.params.name;

      if (username !== null)  {
        Place.findOne({name: name}).then(async place => {
          if (!place.isFree){
            place.isFree = true;
          } else {
            await User.findOne({username : username}).then(user => {
              place.isFree = false;
              place.owner = user._id;
            });
          }

          place.save();
        })

        res.send("OK")
      } else {
        res.status(404).json({"username": username});
      }
    } catch (e) {
      res.send("NOT OK")
    }
  }

  AddNewPlace = (req, res) => {
    try{
      var username = req.params.username;
      if (username !== 'admin' || username === null){
        res.status(403).json({description : "У Вас нет прав на это действие"});
        return;
      }


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

