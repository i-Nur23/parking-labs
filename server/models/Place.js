import mongoose, {Schema} from "mongoose";

var PlaceSchema = new Schema({
  name : String,
  isFree : Boolean,
  tags : [String]
})

export const Place = mongoose.model('Place', PlaceSchema);