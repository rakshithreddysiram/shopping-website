const express=require("express");
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use('/contact', require('./routes/contact'));

app.get('/', (req, res) => {
  console.log("I'm a GET request");
  res.send("Hello World!");
});
app.post('/', (req, res) => {
  console.log("I'm a post request");
  res.send("Hello World2!");
});

app.get("/index", (req, res) => {
  console.log("I'm a Index");
  res.sendFile("public/mypage.html",{root: __dirname});
});

app.listen(port, () => {
  console.log(`Example app listening  on port ${port}`);
});
