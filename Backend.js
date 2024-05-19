import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from 'uuid';

const app=express();
const port=3000;
const _dirName= dirname(fileURLToPath(import.meta.url))

let journal = [
    {
        title: "Cultural Immersion in a Historic Town",
        Date: "2024-04-25",
        description: "Immersed myself in the heritage and traditions of a charming town.",
        content: "Wandering through cobblestone streets lined with centuries-old buildings, I delved into the rich history of a quaint town. The aroma of local cuisine filled the air, and friendly locals shared stories of their community's past. It felt like stepping back in time."
    },
    {
        title: "Stargazing in the Desert",
        Date: "2024-04-29",
        description: "Gazed at a dazzling night sky far from city lights.",
        content: "Under the vast canopy of stars in the desert, I marveled at the sheer beauty and immensity of the universe. The darkness was illuminated by countless constellations, and the silence was profound. It was a humbling reminder of our place in the cosmos."
    }
];

journal.map((entry)=>{
    entry.id=uuidv4()
})

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }));



//home page response
app.get("/",(req,res)=>{

    res.render("List.ejs",{dataArray:journal})
}) 


app.post("/entry",(req,res)=>{
 let entry = journal.find(entry => entry.id === req.body.entryId);
 
 res.render("entry.ejs",{entry:entry})
})

//from page 
app.get("/new_entry",(req,res)=>{
    res.render("form.ejs")
})

//from submit-add new entry
app.post("/form/submit",(req,res)=>{

      let existingEntryIndex=journal.findIndex(journalEntry=>journalEntry.id===req.body.entryId)
    
      if(existingEntryIndex>=0 &&  existingEntryIndex<journal.length){
        journal= journal.filter(journalEntry=>journalEntry.id!==req.body.entryId)

      }   
    let newEntry={
        id:uuidv4(),
        title:req.body.title.trim(),
        Date:req.body.Date.trim(),
        description:req.body.description.trim(),
        content:req.body.content.trim()
      }  

    journal.push(newEntry)
res.redirect("/")


})
//delete an entry
app.post("/delete",(req,res)=>{
   journal= journal.filter(journalEntry=>journalEntry.id!==req.body.entryId)
  res.redirect('/')
})
//update entry
app.post("/update_entry",(req,res)=>{
     console.log(req.body)
    let entry={
          id:req.body.entryId,
          title:req.body.title.trim(),
          Date:req.body.Date.trim(),
          description:req.body.description.trim(),
          content:req.body.content.trim(),
    }
  res.render("form.ejs",{bookName:req.body["bookName"],entry:entry})
 
})

app.listen(port,(req,res)=>{
    console.log( `server is running on Localhost:`+ port)
})