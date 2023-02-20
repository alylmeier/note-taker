const express = require("express");
const fs = require("fs");
const path = require("path");
const PORT = process.env.PORT || 3001;
//const notes = require("./public/notes");
let db = require("./db/db.json");
const uuid = require("./public/assets/js/uuid");

const app = express();

// Middleware for parsing application/json
app.use(express.json());

// Middleware for urlecoded data
// `urlencoded` data represents a URL encoded form. If we had a HTML form with fields: `username` and `password`, our urlencoded data would be "username=JohnAppleseed&password=passw0rd"
// This middleware will parse that string into an object containing key value pairs
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", (req, res) => {
  res.json(db);
});

app.post("/api/notes", (req, res) => {
  console.info(`${req.method} request received to add a note`);
  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      title,
      text,
      review_id: uuid(),
    };

    //const noteString=JSON.stringify(newNote);

    //fs.writeFile(`./db/`)
    fs.readFile("./db/db.json", "utf8", (err, data) => {
      if (err) {
        console.error(err);
      } else {
        db = JSON.parse(data);
        db.push(newNote);

        fs.writeFile("./db/db.json", JSON.stringify(db), (writeErr) =>
          writeErr
            ? console.error(writeErr)
            : console.info("Your note has been added")
        );
        res.json(newNote);
      }
    });
  } else {
    res.status(500).json("Please enter a title and note");
  }
});

app.listen(PORT, () =>
  console.log(`Express server listening on port ${PORT}!`)
);
