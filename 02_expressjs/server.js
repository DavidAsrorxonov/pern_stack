import express from "express";

const app = express();
const port = 3000;

const router = express.Router();

app.get("/", (req, res) => {
  res.send("Hello from the Express server");
});

router.get("/", (req, res) => {
  res.send("All cars");
});

router.post("/", (req, res) => {
  res.send("New car");
});

router.put("/:id", (req, res) => {
  res.send(`Update car ${req.params.id}`);
});

router.delete("/:id", (req, res) => {
  res.send(`Delete car ${req.params.id}`);
});

router.get("/:id", (req, res) => {
  res.send(`Get car ${req.params.id}`);
});

app.use("/api/v1", router);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
