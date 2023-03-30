const express = require("express");
const cheerio = require("cheerio");
const axios = require("axios");
const { mensModel } = require("../models/Mens.model");
const mensRouter = express.Router();

const url =
  "https://www.mytheresa.com/int_en/men/new-arrivals/current-week.html";


mensRouter.use(express.json());

async function getMens(url,page) {
    const mens_data = [];
  try {
    const menFromDb = await mensModel.find();
       console.log(page);
      const response = await axios.get(url+ "?p="+ page);
      const $ = cheerio.load(response.data);
      const mens = $(".item");
      mens.each(async function () {
        image = $(this).find(".product-image img").attr("data-src");
        category = $(this).find(".ph1").text();
        title = $(this).find(".pa1-rm").text();
        price = $(this).find(".price").text();
        mens_data.push({ image, category, title, price });   
    });
// for (let i = 0; i < mens_data.length; i++) {
//     const el = mens_data[i];
//     const arr = menFromDb.map((el, i) => el.image);
//     if (!arr.includes(el.image)) {
//       const new_men = await new mensModel(el);
//       await new_men.save();
//       menFromDb.push(el);
//     }
//   }
return(mens_data);

  } catch (err) {
    console.log(err);
  }
}


mensRouter.get("/", async (req, res) => {
    let page = req.query._page || 1;
   
  try {
    const men = await getMens(url,page);
    console.log("men", men)
    res.send(men)
  } catch (err) {
    console.log("Something went wrong");
    console.log(err);
  }
});


mensRouter.get("/", async (req, res) => {
  let page = req.query._page || 1;
  
try {
  const men = await getMens(url,page);
  console.log("men", men)
  res.send(men)
} catch (err) {
  console.log("Something went wrong");
  console.log(err);
}
});


module.exports = {
  mensRouter,
};
