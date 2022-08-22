const express = require('express');
const app = express();
// require("./db");
const Register = require("./models");
const path = require("path");
const port = process.env.PORT  || 3000;

const db = "mongodb+srv://Prateek:Passwordcluster0.yoptukr.mongodb.net/myfirstdb?retryWrites=true&w=majority";
const mongoose = require("mongoose");

mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=>{
  console.log("connection successfull");
}).catch((err)=>{
  console.log(err);
})


app.use(express.json());
app.use(express.urlencoded({extended:false}));

const static_path = path.join(__dirname, "./public");
app.use(express.static(static_path))
app.set("view engine", "hbs");

app.get("/", (req, res) =>{
     res.render("index")
})
app.get("/contact", (req, res) =>{
    res.render("contact")
})

app.post("/contact", async (req, res) =>{
    try{
        const savedb = new Register(
            {
                name: req.body.name,
                email: req.body.email,
                message: req.body.message
            }
        )
        const saved = await savedb.save();
        res.status(201).render("contact");
    }catch(error){
        res.status(400).send(error);
    }

})
app.listen(port, () => {
    console.log(" Server is running at port number : ", port)
})
