//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose= require("mongoose");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";

const aboutContent = "Daily Journal is a blog keeping website, People can write their own blogs.";

const contactContent = "Reach us with your query.";

const app = express();

mongoose.connect('mongodb://localhost:27017/blogDB', {useNewUrlParser: true, useUnifiedTopology:true});

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


//schema for post
const postSchema = {
  title : String,
  content: String
};

const Post = mongoose.model("Post",postSchema);


app.get("/",function(req,res){
  Post.find({},function(err,foundPosts){
      res.render("home",{homeContent:homeStartingContent,posts:foundPosts});
  });

});



app.get("/about",function(req,res){
  res.render("about",{aboutContent:aboutContent});
});

app.get("/contact",function(req,res){
  res.render("contact",{contactContent:contactContent});
});


app.get("/compose",function(req,res){
  res.render("compose");
})

app.post("/compose",function(req,res){

  const postItem = new Post({
    title:req.body.titlePost,
    content:req.body.bodyPost
  });
  postItem.save(function(err)
{
  if(!err){
    res.redirect("/");
  }
});
});



app.get("/posts/:postId",function(req,res){
let pTitle="",pPost="";
const par=req.params.postId;
  Post.findOne({_id:par },function(err,pos)
{
if(!err){
  pTitle = pos.title;
  pPost = pos.content;
  console.log("Success");
  res.render("post",{indiTitle:pTitle,indiContent:pPost});
}
else
{
  console.log("Fails");
}
    });
  });



app.listen(3000, function() {
  console.log("Server started on port 3000");
});
