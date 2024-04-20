const express = require("express");
const app = express();
const port = 3000;
const hostname = "127.0.0.1";
const path = require("path"); // Import the path module

const fs = require("fs");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

// Middleware to serve static files
app.use(express.static(path.join(__dirname, "public")));

// Middleware for parsing request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware for parsing cookies
app.use(cookieParser());



// Customer middleware for cookie validation
async function validateCookies(req, res, next) {
  await cookieValidator(req.cookies);
  next();
}
// Function to validate cookies
async function cookieValidator(cookies) {
  console.log(cookies);
  // We don't have any cookies to validate, so we'll just return true for now.
  return true;
}

app.use(validateCookies);



// Template engine setup
app.engine("tabitha", (filepath, options, callback) => {
  fs.readFile(filepath, (err, content) => {
    if (err) return callback(err);

    const rendered = content
      .toString()
      .replaceAll("#title#", `${options.title}`)
      .replace("#content#", `${options.content}`);

    return callback(null, rendered);
  });
});

app.set("views", "./views");
app.set("view engine", "tabitha");

// Route for the home page
app.get("/", (req, res) => {
  const options = {
    title: "Home Page",
    content:
      "This is the content of our home page.\
        Here is the link to register: \
        <a href='/register'>Register</a>",
  };

  res.render("index", options);
});


// Route for the registration page
app.get("/register", (req, res) => {
  const options = {
    title: "Registration Page",
    content:
      "This is the content of our registration page.\
        Here is the link to our about page: \
        <a href='/about'>About</a>",
  };

  res.render("register", options);
});

// Route for the about page with a username parameter
app.get("/about/:username", (req, res) => {
  const username = req.params.username;
  const options = {
    title: "About Page",
    content: `This is the content of our about page for ${username}.\
        Here is the link to our home page: \
        <a href='/'>Home</a>`,
  };

  res.render("about", options);
});

// Route handler for the download button
app.get("/download", (req, res) => {
    const filePath = path.join(__dirname, 'public', 'pexels-quang-nguyen-vinh-2132087.jpg');
    res.download(filePath); // Initiates the file download
});



app.post("/register", (req, res) => {
  // Log the form data to the console
  console.log("Received form data:", req.body);

  // Render the "about" template
  const options = {
    title: "Registration Page",
    content:
      "This is the content of our registration page.\
        Here is the link to our about page: \
        <a href='/about'>About</a>",
  };

  res.render("about", options);
});

app.get("/public/style.css", (req, res) => {
    res.sendFile(__dirname + "/public/style.css");
  });

app.listen(port, () => {
  console.log(`Server listening on port: http://${hostname}:${port}/`);
});
