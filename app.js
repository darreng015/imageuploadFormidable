const express= require('express');
const formidable = require('formidable');
const fs = require('fs');
const app = express();
const port = 9998;


app.use(express.static(__dirname+'/public'));
app.set('view engine', 'ejs');

app.get('/',(req,res)=>{
    res.render('index');
})

app.post('/profile', (req,res)=>{
    let form = new formidable.IncomingForm();
    form.parse(req,(err,fields,files) =>{
        let oldp=files.fileName.filepath;
        let newp = `${__dirname}/public/images/${files.fileName.originalFilename}`
        console.log('Old path',oldp);
        console.log('New path',newp);
        fs.rename(oldp,newp,(err) =>{
            res.send('File uploaded');
        })
    })
})

app.listen(port,()=>{
    console.log('Listening on port '+port);
})