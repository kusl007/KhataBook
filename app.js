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
    res.render("create");
 
});

app.post("/createhisaab",function(req,res){
    const now = new Date();

    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = now.getFullYear();
    const fn = `${day}-${month}-${year}.txt`;
  
    fs.writeFile(`./hisaab/${fn}`, req.body.content, function (error) {
      if (error) {
        res.status(500).send("something went wrong in creating the file ");
      } 
        res.redirect("/")
      
    });

})

app.get(`/edit/:filename`,(req,res)=>{
    
    fs.readFile(`./hisaab/${req.params.filename}`,"utf-8",function(err,filedata){
        if (err){ return res.send("error occured in reading file")}        
        res.render('edit',{filedata,filename:req.params.filename})
    })
})

app.post(`/update/:filename`,(req,res)=>{
    fs.writeFile(`./hisaab/${req.params.filename}`,req.body.content, function(err){
        if (err){ return res.send(err)}
        
        res.redirect('/')
    })
})
app.get("/hisaab/:filename",(req,res)=>{
fs.readFile(`./hisaab/${req.params.filename}`, "utf-8",function(err,filedata){
    if(err){res.status(500).send(err)}
    res.render("hisaab",{filedata,filename:req.params.filename})
})
})
app.get(`/delete/:filename`,(req,res)=>{
    fs.unlink(`./files/${req.params.filename}`, function(err){
        if (err){ return res.send(err)}
        
        res.redirect('/')
    })
})

app.listen(3000);
