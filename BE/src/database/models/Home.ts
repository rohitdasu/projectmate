import mongoose from "mongoose";
interface HomeData {
  title: String;
  subTitle: String;
}

const homeSchema = new mongoose.Schema({
  title: String,
  subTitle: String,
});

const HomeSchema = mongoose.model("home", homeSchema);

const HomeBuild = (data: HomeData) => {
  return new HomeSchema(data);
};

export { HomeBuild, HomeSchema, HomeData };
