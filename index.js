const express = require("express");
const app = express();
// const port = 8080;
const path = require("path");
const { v4 : uuidv4 } = require("uuid");
const methodOverride = require("method-override");

app.use(express.urlencoded({extended : true}));
app.use(methodOverride('_method'))

app.set("view engine", "ejs");
app.set("views" ,path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname, "public")));


let posts = [
    {
        id : uuidv4(),
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOYvQs_n_fIqfduy9oMhjkC2OQ5bZf2kUroJVvn8xq7dpvtyk42QMdGhLd&s=10",
        username : "anshu raj",
        content : "Nice cat",
        comments:{
            anshu: "Very beautiful!",
            ankit: "Nice post!",
            rahul: "Looking delicious 😋",
            priya: "Amazing picture ❤️",
            rohit: "Fresh and juicy 🍓",
            sneha: "Love this!",
            amit: "Great photography 📸",
            pooja: "Wow, so cute!",
            vikash: "Keep posting!",
            neha: "This looks so yummy 😍"
        }
    },
    {
        id : uuidv4(),
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJQ_rYKR39qdvGXgene-j3sI-bXknGfOFxcSLyim4in7e7bFtRC9hVQcOk&s=10",
        username : "aman pratap",
        content : "Nature beauty",
        comments:{
            amit: "Great photography 📸",
            pooja: "Wow, so cute!",
            vikash: "Keep posting!",
            neha: "This looks so yummy 😍"
        }
    },
    {
        id : uuidv4(),
        image: "https://static.vecteezy.com/system/resources/thumbnails/057/068/323/small/single-fresh-red-strawberry-on-table-green-background-food-fruit-sweet-macro-juicy-plant-image-photo.jpg",
        username : "rahul kumar",
        content : "Nice strawberry",
        comments:{
            priya: "Amazing picture ❤️",
            rohit: "Fresh and juicy 🍓",
            sneha: "Love this!",
            amit: "Great photography 📸",
            pooja: "Wow, so cute!",
            vikash: "Keep posting!",
        }
    }
]

app.get("/",(req,res)=>{
    res.redirect("/posts");
})

app.get("/posts", (req , res)=>{
    res.render("index.ejs", { posts });
})

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
})
app.get("/posts/:id",(req,res)=>{
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    console.log(post);
    if(post !== undefined){
        res.render("show.ejs",{ post });
    }
})

app.get("/posts/:id/edit",(req,res)=>{
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    console.log(post);
    if(post !== undefined){
        res.render("edit.ejs",{ post });
    }
})

app.get("/posts/:id/all",(req,res)=>{
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    if(post !== undefined){
        let comment = post.comments;
        res.render("view.ejs",{ post });
    }
})

app.get("/posts/:id/add",(req,res)=>{
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    if(post !== undefined){
        res.render("add.ejs",{ id });
    }
})

app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    // console.log(post);
    res.redirect("/posts");
})

app.delete("/posts/:id",(req,res)=>{
    let { id } = req.params;
    posts = posts.filter((p)=>id !== p.id);
    res.redirect("/posts");
})

app.post("/posts", (req , res) =>{
    let {username,image,content} = req.body;
    let id = uuidv4();
    posts.push({id,image,username,content,comments:{}});
    res.redirect("/posts");
})

app.post("/posts/add",(req,res)=>{
    let {id,username,comment} =req.body;
    let post = posts.find((p) => id === p.id);
    post.comments[username] = comment;
    res.redirect("/posts");
})

if (require.main === module) {          //for locally work
    app.listen(8080, () => {
        console.log("Listening to port: 8080");
    });
}

module.exports = app;       //for vercel deploy