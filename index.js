const express = require("express")
const app = express()
const port = 3000
const hostname = '127.0.0.1';

//Using codesandboc from slides "Express: Creating Template Engines"

const fs = require('fs');
//const userRoutes = require('./rout')

//app.use("/user", userRoutes)

app.engine("tabitha", (filepath, options, callback) => {
    fs.readFile(filepath, (err, content) =>{
        if (err) return callback(err);

        const rendered = content
            .toString()
            .replaceAll("#title#", `${options.title}`)
            .replace("#content#", `${options.content}`)

        return callback(null, rendered);
    })
})

app.set("views", "./views");
app.set("view engine", "tabitha");

app.get("/", (req,res) =>{
    const options = {
        title: "Home Page",
        content: "This is the content of our home page.\
        Here is the link to register: \
        <a href='/register'>Register</a>"
    };
    
    res.render("index", options);
})

app.get("/register", (req,res) =>{
    const options = {
        title: "Registration Page",
        content: "This is the content of our registration page.\
        Here is the link to our about page: \
        <a href='/about'>About</a>"
    };
    
    res.render("register", options);
})

app.get("/about", (req,res) =>{
    const options = {
        title: "About Page",
        content: "This is the content of our about page.\
        Here is the link to our home page: \
        <a href='/'>Home</a>"
    };
    
    res.render("about", options);
})

app.post("/register", (req,res) =>{
    const options = {
        title: "Registration Page",
        content: "This is the content of our registration page.\
        Here is the link to our about page: \
        <a href='/about'>About</a>"
    };
    
    res.render("about", options);
})



app.listen(port, ()=> {
    console.log(`Server listening on port: http://${hostname}:${port}/`);
})


