const express = require("express");
const mongoose = require("mongoose");
const BrandName = require("./model");
const { all } = require("axios");
const app = express();

app.use(express.json());
mongoose
  .connect(
    "mongodb+srv://hubby:hubby@cluster0.6dng250.mongodb.net/?retryWrites=true&w=majority",
    { useUnifiedTopology: true, useNewUrlParser: true }
  )
  .then(() => console.log("DB connected..."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("<h1>Creating API with Node.js, Express and MongoDB</h1>");
});

app.post("/addbrands", async (req, res) => {
  const { brandname } = req.body;
  try {
    const newData = new BrandName({
      brandname: brandname,
    });
    await newData.save();
    return res.json(await BrandName.find());
  } catch (err) {
    console.log(err.message);
  }
});

app.get("/getallbrands", async (req, res) => {
  try {
    const allData = await BrandName.find();
    return res.json(allData);
  } catch (err) {
    console.log(err.message);
  }
});

app.get("/getallbrands/:id", async (req, res) => {
  try {
    const Data = await BrandName.findById(req.params.id);
    return res.json(Data);
  } catch (err) {
    console.log(err.message);
  }
});

app.delete("/deletebrand/:id", async (req, res) => {
  try {
    await BrandName.findByIdAndDelete(req.params.id);
    return res.json(await BrandName.find());
  } catch (err) {
    console.log(err.message);
  }
});

app.put("/putbrand/:id", async (req, res) => {
  const { id } = req.params;
  const { brandname } = req.body;

  try {
    const brand = await BrandName.findById(id);
    if (!brand) {
      return res.status(404).json({ error: "Brand not found" });
    }

    brand.brandname = brandname;
    await brand.save();

    return res.json(brand);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: "Server error" });
  }
});

app.listen(3000, () => {
  console.log("Server running");
});
