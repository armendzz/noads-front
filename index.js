const express = require('express')
const app = express()
const port = 3000
const fs = require('fs');
const ytdl = require('ytdl-core');
const ytsr = require('ytsr');
const bodyParser = require('body-parser')
var cors = require('cors');
app.use(cors());

app.use(bodyParser.json());


// ============================================ single
app.use(express.json());
var urlencodedParser = bodyParser.urlencoded({extended: false});

app.use(bodyParser.urlencoded({
    extended: true
  }));




async function start(vidid) {
    let videoID = ytdl.getVideoID(vidid)
    let info = await ytdl.getInfo(videoID);
    let format = info.formats
    let result = [];
    format.forEach(e => {
        if (typeof e.audioSampleRate !== 'undefined') {
            
           if(e.mimeType.includes('video')) result.push(e);
            
          }
    })
    return info;
 }

app.post('/single', urlencodedParser, (req, res) => {
  
    start(req.body.vidid).then(response => {
        res.send(response)
     })
})


/////////////////////////////////////////////////////////////////////////


// ====================== search =====================


async function search(searchterm) {
   let result = [];
    const searchResults = await ytsr(searchterm, { pages: 1 });
    searchResults.items.forEach(e =>  {
        if(e.type === 'video') result.push(e)
    })
    return result;
 }

//dosth(searchResults);
app.post('/search', urlencodedParser, (req, res) => {
    
     search(req.body.searchterm).then(response => {
        res.send(response)
     }) 
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})