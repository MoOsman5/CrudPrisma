const express = require("express");
require("dotenv").config();
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT;

app.use(express.json());

app.get("/", async (req, res) => {
  const allUsers = await prisma.user.findMany();
  res.json(allUsers);
});
app.post("/", async (req, res) => {
  const newUser = await prisma.user.create({ data: req.body });
  res.json(newUser);
});
app.put("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const newAge = req.body.age;
  const updatedUser = await prisma.user.update({
    where: { id: id },
    data: { age: newAge },
  });
  res.json(updatedUser);
});
app.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const deletedUser = await prisma.user.delete({
    where: { id: id },
  });
  res.json(deletedUser);
});

app.post("/house", async (req, res) => {
  const newHouse = await prisma.house.create({ data: req.body });
  res.json(newHouse);
});

app.get("/house", async (req, res) => {
  const allHouses = await prisma.house.findMany({
    include: {
      owner: true,
      builtBy: true,
    },
  });
  res.json(allHouses);
});
app.get("/house/:id", async (req, res) => {
  const id =req.params.id
  const allHouses = await prisma.house.findUnique({
    where:{id},
    include: {
      owner: true,
      builtBy: true,
    },
  });
  res.json(allHouses);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
