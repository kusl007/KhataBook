const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
 fs.readdir(`./files`,function(err,files){
    // console.log(files)
    res.render("index",{files})
 })
});

app.get("/create", (req, res) => {
  const now = new Date();

  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = now.getFullYear();
  const fn = `${day}-${month}-${year}.txt`;

  fs.writeFile(`./files/${fn}`, "apple", function (error) {
    if (error) {
      res.send("something went wrong ");
    } else {
      res.send("done");
    }
  });
});

app.listen(3000);
