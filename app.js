const express = require("express");
const app = express();

const path = require("path");
const fs = require("fs");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public"))); 

app.get("/", (req, res) => {
 fs.readdir(`./hisaab`,function(err,files){
    if(err){
       return res.status(500).send(err)
    }
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
      res.render("create");
    }
  });
});
app.get(`/edit/:filename`,(req,res)=>{
    fs.readFile(`./files/${req.params.filename}`,"utf-8",function(err,data){
        if (err){ return res.send(err)}
        
        res.render('edit',{data,filename:req.params.filename})
    })
})
app.post(`/update/:filename`,(req,res)=>{
    fs.writeFile(`./files/${req.params.filename}`,req.body.filedata, function(err){
        if (err){ return res.send(err)}
        
        res.redirect('/')
    })
})
app.get(`/delete/:filename`,(req,res)=>{
    fs.unlink(`./files/${req.params.filename}`, function(err){
        if (err){ return res.send(err)}
        
        res.redirect('/')
    })
})

app.listen(3000);
