import mongoose from "mongoose";
interface PostData {
  _id: Number;
  title: String;
  description: String;
}

const postSchema = new mongoose.Schema({
  _id: Number,
  title: String,
  description: String,
});

const PostSchema = mongoose.model("post", postSchema);

const PostBuild = (data: PostData) => {
  return new PostSchema(data);
};

export { PostBuild, PostSchema, PostData };
