import { Document, Schema, model} from "mongoose";
import bcrypt from 'bcrypt';
import { IUser } from "../interfaces/User";

export const UserSchema: Schema = new Schema({
    name: String,
    email: String,
    password: String
}, { timestamps: true });

UserSchema.pre("save", function(next) {
  if (!this.isModified('password')) {
      return next();
  }

  this.set('password', bcrypt.hashSync(this.get('password'), 10));
  return next();
});

export default model<IUser & Document>("User", UserSchema);