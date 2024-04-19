const express = require('express');
const {google} = require('googleapis');

const PORT = process.env.PORT || 3010;
const app = express();

const apiKey = "AIzaSyB0WwUlss8IfetYU9L8p5fV_RvhGNWgFbE";
const youtube = google.youtube({
  version: "v3",
  auth: apiKey,
});

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.get("/comments", async (req, res, next) => {
    try {
      const response = await youtube.commentThreads.list({
        "part": [
            "snippet"
          ],
          "maxResults": 30,
          "videoId": req.query.videoId 
      });
      // console.log(response.data.items)
      res.json({ data: response.data.items});
    } catch (err) {
      next(err);
    }
  });

 
app.listen(PORT, () => {

  console.log(`Server listening on ${PORT}`);
});

