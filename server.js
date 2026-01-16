const  express = require("express");
const app = express();
const path = require("path");
 
app.use(express.static(path.join(__dirname, "frontend")));
 
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/frontend/index.html"));
});
 
 
const Port = process.env.PORT || 8080;
app.listen(Port, () =>
    console.log("Web Server is listening at port " + Port));