import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import path from "path";
import fs from "fs";

const app=express();
const port=3000;
const _dirName= dirname(fileURLToPath(import.meta.url))
let books=[{Name:"Journal",path:path.join(_dirName, "books", "journal.json")}]

// takes data from book, renders its entries create link responsers for each entry
function renderEntries(book,res,req){
    
    fs.readFile(book.path,"utf8", (err, data) => {

        if (err) {
           console.error("Error reading book file:", err);
           res.status(500).send("Error reading book file");
            return;
               }

       const bookData = JSON.parse(data);  
       
      res.render("List.ejs", {dataArray:bookData,bookName:book.Name});

      bookData.forEach(entry => {
       app.get(`/${book.Name +"/"+entry.Date}`,(req,res)=>{
            res.render("book_template.ejs",{entry:entry,bookName:book.Name});
           })
    });

}) 
}

//for each book renders it entries and create link responses
function GenerateLinks(){
    books.forEach(book=>{  
        app.get(`/${book.Name}`,(req,res)=>{
             renderEntries(book,res,req)
       }) 
    })
    }
GenerateLinks()



app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }));



//home page response
app.get("/",(req,res)=>{
    res.render("index.ejs",{bookList:books})
}) 

//
app.post("/newbook",(res,req)=>{
    
})
//from page 
app.post("/form",(req,res)=>{
    res.render("form.ejs",{bookName:req.body["bookName"]})
})
//from submit-add new entry
app.post("/form/submit",(req,res)=>{
   
   let book=books[books.findIndex(book => {
        return book.Name === req.body["bookName"];
    })]

    let bookData;
    
//add new entry to existing data 
fs.readFile(book.path,"utf8", (err, data) => {

        if (err) {
         console.error("Error reading book file:", err);
         res.status(500).send("Error reading book file");
          return;
               }
        
          let newEntry={
            title:req.body.title.trim(),
            Date:req.body.Date.trim(),
            description:req.body.description.trim(),
            content:req.body.content.trim()
          }      
          bookData = JSON.parse(data);
          bookData=bookData.filter((book)=>{return book.Date!==req.body.Date.trim()})
          bookData.push(newEntry)
          
          bookData=JSON.stringify(bookData)
         fs.writeFile(book.path,bookData,(err)=>{
                   if (err) throw err
                  else{
                     console.log("the file has been saved")
                     }
}) 

       
 })   
res.redirect("/")


})
//delete an entry
app.post("/delete",(req,res)=>{
    let book=books[books.findIndex(book => {
        return book.Name === req.body["bookName"];
    })]

    let bookData;
    fs.readFile(book.path,"utf8", (err, data) => {

        if (err) {
         console.error("Error reading book file:", err);
         res.status(500).send("Error reading book file");
          return;
               }
        
               bookData = JSON.parse(data);
               bookData=bookData.filter((book)=>{return book.Date!==req.body["entryDate"]})
               bookData=JSON.stringify(bookData)
               fs.writeFile(book.path,bookData,(err)=>{
                         if (err) throw err
                        else{
                           console.log("the file has been saved")
                           }
      }) 

            })
           
   res.redirect("/")
          
})
//update entry
app.post("/update_entry",(req,res)=>{
    let entry={
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