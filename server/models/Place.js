import mongoose, {Schema, Types} from "mongoose";

var PlaceSchema = new Schema({
  name : String,
  isFree : Boolean,
  tags : [String],
  owner : {type : Schema.ObjectId, ref : 'User'}
})

export const Place = mongoose.model('Place', PlaceSchema);