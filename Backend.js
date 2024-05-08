import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import path from "path";
import fs from "fs";

const app=express();
const port=3000;
const _dirName= dirname(fileURLToPath(import.meta.url))

function renderEntries(data,book_name,res,req){
    
    res.render("List.ejs", {dataArray:data,bookName:book_name});

    data.forEach(page => {

 app.get(`/${book_name +"/"+page.Date}`,(req,res)=>{
     res.render("book_template.ejs",page);
 })
    });
}

let books=[{Name:"Journal",path:path.join(_dirName, "books", "journal.json")}]

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }));


app.post("/form",(req,res)=>{
    res.render("form.ejs",{bookName:req.body["bookName"]})
})
app.get("/",(req,res)=>{
    res.render("index.ejs",{bookList:books})
}) 

books.forEach(book=>{  

    app.get(`/${book.Name}`,(req,res)=>{
         fs.readFile(books[0].path,"utf8", (err, data) => {
         if (err) {
    console.error("Error reading book file:", err);
    res.status(500).send("Error reading book file");
    return;
                }

            const journalData = JSON.parse(data);  
          
      renderEntries(journalData,book.Name,res,req)
           
        }) 
   }) 
})

app.post("/form/submit",(req,res)=>{
  
   let bookPath=books[books.findIndex(book => {
        return book.Name === req.body["bookName"];
    })].path

    fs.readFile(bookPath,"utf8", (err, data) => {

        if (err) {
         console.error("Error reading book file:", err);
         res.status(500).send("Error reading book file");
          return;
               }
        
          let newEntry={
            title:req.body.title,
            Date:req.body.Date,
            description:req.body.description,
            content:req.body.content
          }      
          const journalData = JSON.parse(data);  
      
   journalData.push(newEntry) 
   console.log(journalData)
 
      
   
     renderEntries(journalData,req.body["bookName"],res,req) 
      
   
 })   

})

app.listen(port,(req,res)=>{
    console.log( `server is running on Localhost:`+ port)
})