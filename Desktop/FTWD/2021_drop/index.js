const express = require('express')
const upload = require('express-fileupload')
const app = express();

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(upload())

const db = []

app.get('/',(req,res)=>{
    res.sendFile(__dirname + "/pages/index.html")
})

app.post('/upload', function(req, res) {
  let sampleFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  sampleFile = req.files.sampleFile;
  uploadPath = __dirname + '/uploads/' + sampleFile.name;

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(uploadPath, function(err) {
    if (err)
      return res.status(500).send(err);

    res.send('File uploaded!');
  });
});

app.listen(8000,()=>{
    console.log("listen to the port")
})