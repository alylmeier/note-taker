const express = require("express");
const fs = require("fs");
const path = require("path");
const port = process.env.PORT || 3001;
//const notes = require("./public/notes");
const db = require("./db/db.json");

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
  //array is "db"
  //new note called "req.body"
  db.push(req.body);
  fs.writeFile(`./db/db.json`, JSON.stringify(db), (err) =>
    err ? console.error(err) : console.log(`File written successfully`)
  );
  res.json(db);
});

app.post("/api/fun/:id", (req, res) => {
  console.log(req.params);
  res.json("we are having fun");
});

//app.post creates information  Create
//app.get  gets information     Read
//app.put  updates information  Update
//app.delete deletes info       Destroy

// // GET request for ALL reviews
// app.get("/api/notes", (req, res) => {
//   // Log our request to the terminal
//   console.info(`${req.method} request received to get notes`);

//   // Sending all reviews to the client
//   return res.status(200).json(notes);
// });

// // GET request for a single review
// app.get("/api/reviews/:review_id", (req, res) => {
//   if (req.params.review_id) {
//     console.info(`${req.method} request received to get a single a review`);
//     const reviewId = req.params.review_id;
//     for (let i = 0; i < reviews.length; i++) {
//       const currentReview = reviews[i];
//       if (currentReview.review_id === reviewId) {
//         res.status(200).json(currentReview);
//         return;
//       }
//     }
//     res.status(404).send("Review not found");
//   } else {
//     res.status(400).send("Review ID not provided");
//   }
// });

// // POST request to add a review
// app.post("/api/notes", (req, res) => {
//   // Log that a POST request was received
//   console.info(`${req.method} request received to add a note`);

//   // Prepare a response object to send back to the client
//   let response;

//   // Check if there is anything in the response body
//   if (req.body && req.body.product) {
//     response = {
//       status: "success",
//       data: req.body,
//     };
//     res.status(201).json(response);
//   } else {
//     res.status(400).json("Request body must at least contain a product name");
//   }

//   // Log the response body to the console
//   console.log(req.body);
// });

// // Convert the data to a string so we can save it
// const reviewString = JSON.stringify(newReview);

// // Write the string to a file
// fs.writeFile(`./db/${newReview.product}.json`, reviewString, (err) =>
//   err
//     ? console.error(err)
//     : console.log(
//         `Review for ${newReview.product} has been written to JSON file`
//       )
// );

app.listen(PORT, () =>
  console.log(`Express server listening on port ${PORT}!`)
);
