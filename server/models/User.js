import mongoose, {Schema} from "mongoose";

var UserSchema = new Schema({
  username : String
})

export const User = mongoose.model('User', UserSchema);