import {User} from "../models/User.js";
import {Place} from "../models/Place.js";

export class UsersController{
  GetAll = async (req, res) => {
    try{
      var username = req.params.username;
      if (username !== 'admin'){
        res.status(403).json({});
        return;
      }

      res.json(await User.find().exec())

    } catch (e) {
      res.status(404).json({});
    }
  }

  Add = async (req, res) => {
    try{
      var username = req.query.name;

      var usersWithSameName = await User.find({username : username}).exec();
      if (usersWithSameName.length != 0){
        res.json({ok : false, description : "Такой пользователь уже существует"})
      } else {
        var new_user = new User({username : username})

        new_user.save();

        res.json({ok : true, description : ""})
      }

    } catch (e) {
      console.log(e)
      res.json({ok : false, description : "Ошибка на сервере"});
    }
  }

  Delete = async (req, res) => {
    try{
      var id = req.params.id;

      await User.findByIdAndDelete(id).exec();

      await Place.updateMany({owner : id}, {$set : {isFree : true}}).exec();

      res.json({ok : true, description : ""})
    } catch (e) {
      console.log(e)
      res.json({ok : false, description : "Ошибка на сервере"});
    }
  }
}