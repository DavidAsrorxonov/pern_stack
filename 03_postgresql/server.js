import express from "express";
import { db } from "./db.js";
import { cars } from "./schema.js";
import { eq } from "drizzle-orm";

const app = express();
const port = 3000;

const router = express.Router();

app.use(express.json());

app.use((req, res, next) => {
  const timestamp = new Date().toISOString();

  console.log(`[${timestamp}] ${req.method} ${req.url}`);

  next();
});

app.get("/", (req, res) => {
  res.send("Hello from the Express server");
});

router.get("/", async (req, res) => {
  const allCars = await db.select().from(cars);

  res.json(allCars);
});

router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);

  const car = await db.select().from(cars).where(eq(cars.id, id));

  if (!car || car.length === 0) return res.status(404).send("Car not found");

  res.json(car);
});

router.post("/", async (req, res) => {
  const { make, model, year, price } = req.body;

  if (!make || !model || !year || !price)
    return res.status(400).json({ error: "Missing required fields" });

  const [newCar] = await db
    .insert(cars)
    .values({ make, model, year, price })
    .returning();

  res.status(201).json(newCar);
});

// router.put("/:id", (req, res) => {
//   const id = Number(req.params.id);

//   const car = cars.find((car) => car.id === id);

//   if (!car) return res.status(404).send("Car not found");

//   const { make, model, year, price } = req.body;

//   if (make) car.make = make;
//   if (model) car.model = model;
//   if (year) car.year = Number(year);
//   if (price) car.price = Number(price);

//   res.json(car);
// });

// router.delete("/:id", (req, res) => {
//   const id = Number(req.params.id);

//   const carIndex = cars.findIndex((car) => car.id === id);

//   if (carIndex === -1) return res.status(404).send("Car not found");

//   const deleted = cars.splice(carIndex, 1)[0];

//   res.json(deleted);
// });

app.use("/api/v1/cars", router);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
