import mongoose from "mongoose";
interface UserData {
  _id: Number;
  username: String;
  password: String;
  name: String;
  phone: Number;
  email: String;
}

const userSchema = new mongoose.Schema({
  _id: Number,
  username: String,
  password: String,
  name: String,
  phone: Number,
  email: String,
});

const schema = mongoose.model("user", userSchema);

const build = (data: UserData) => {
  return new schema(data);
};

export { build, schema };
