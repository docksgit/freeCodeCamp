require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use(express.urlencoded({ extended: true}))

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

let originalShortUrls = {}

app.post('/api/shorturl', (req, res) => {
  const url = req.body.url
  const randomNumber = Math.floor(Math.random() * 100)

  if (!url.includes('https://') && !url.includes('http://')) {
    res.json({
      error: 'invalid url'
    })
  }

  if (!(url in originalShortUrls)) {
    originalShortUrls[randomNumber] = url

    return res.json({
      original_url: url,
      short_url: randomNumber
    })
  } else {
    return res.json({
      original_url: url,
      short_url: randomNumber
    })
  }
})

app.get('/api/shorturl/:shorturl', (req, res) => {
  const shorturl = parseInt(req.params.shorturl)
  const originalurl = originalShortUrls[shorturl]

  if (originalurl) {
    res.redirect(originalurl)
  } else {
    res.json({
      error: 'Short URL not found'
    })
  }
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
