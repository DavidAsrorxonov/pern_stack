import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello from the Express server");
});

app.get("/api/v1/cars", (req, res) => {
  res.send("All cars");
});

app.post("/api/v1/cars", (req, res) => {
  res.send("New car");
});

app.put("/api/v1/cars/:id", (req, res) => {
  res.send(`Update car ${req.params.id}`);
});

app.delete("/api/v1/cars/:id", (req, res) => {
  res.send(`Delete car ${req.params.id}`);
});

app.get("/api/v1/cars/:id", (req, res) => {
  res.send(`Get car ${req.params.id}`);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
