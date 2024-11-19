const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
const path = require("path");
const mongoose = require("mongoose");
const Listing = require("./models/listing.js")

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const port = 8080;

const MONGO_URL = "mongodb://localhost:27017/wanderlust";

main()
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log("Error = " + err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.get("/", (req, res) => {
  res.send("Hi i am root");
});

app.get("/listings", async (req, res) => {
    let allListings = await Listing.find()
    res.render("listings/index.ejs", {allListings})
})

// app.get("/testListing", async (req, res) => {
//     let sampleListing = await new Listing({
//         title: "My New Villa",
//         description: "By the beach",
//         price: 1200,
//         location: "Calangute, Goa",
//         country: "India"
//     })

//     await sampleListing.save()
//     console.log("Sample was saved")
//     res.send(sampleListing)
// })

app.listen(port, () => {
  console.log("app listening on port" + port);
});
