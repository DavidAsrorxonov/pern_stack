import express from "express";

const app = express();
const port = 3000;

const router = express.Router();

app.use(express.json());

let cars = [
  {
    id: 1,
    make: "Honda",
    model: "Civic",
    year: 2020,
    price: 25000,
  },
  {
    id: 2,
    make: "Toyota",
    model: "Corolla",
    year: 2021,
    price: 30000,
  },
  {
    id: 3,
    make: "Ford",
    model: "Mustang",
    year: 2022,
    price: 35000,
  },
  {
    id: 4,
    make: "Chevrolet",
    model: "Camaro",
    year: 2023,
    price: 40000,
  },
];

app.get("/", (req, res) => {
  res.send("Hello from the Express server");
});

router.get("/", (req, res) => {
  res.json(cars);
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);

  const car = cars.find((car) => car.id === id);

  if (!car) return res.status(404).send("Car not found");

  res.json(car);
});

router.post("/", (req, res) => {
  const { make, model, year, price } = req.body;

  if (!make || !model || !year || !price)
    return res.status(400).json({ error: "Missing required fields" });

  const newCar = {
    id: cars.length + 1,
    make,
    model,
    year: Number(year),
    price: Number(price),
  };

  cars.push(newCar);
  res.status(201).json(newCar);
});

router.put("/:id", (req, res) => {
  const id = Number(req.params.id);

  const car = cars.find((car) => car.id === id);

  if (!car) return res.status(404).send("Car not found");

  const { make, model, year, price } = req.body;

  if (make) car.make = make;
  if (model) car.model = model;
  if (year) car.year = Number(year);
  if (price) car.price = Number(price);

  res.json(car);
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);

  const carIndex = cars.findIndex((car) => car.id === id);

  if (carIndex === -1) return res.status(404).send("Car not found");

  const deleted = cars.splice(carIndex, 1)[0];

  res.json(deleted);
});

app.use("/api/v1/cars", router);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
