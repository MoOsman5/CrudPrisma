const express = require("express");
require("dotenv").config();
const {PrismaClient} =require("@prisma/client")

const app = express();
const prisma =new PrismaClient()
const PORT = process.env.PORT ;

app.use(express.json());

app.get("/", async (req, res) => {
  const allUsers = await prisma.user.findMany()
  res.json(allUsers)
});
app.post("/", async (req, res) => {
  const newUser = await prisma.user.create({data:req.body})
  res.json(newUser)

});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
