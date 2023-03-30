const express = require("express");
const cheerio = require("cheerio");
const axios = require("axios");
const { womensModel } = require("../models/Womens.model");
const womensRouter = express.Router();

const url =
  "https://www.mytheresa.com/int_en/new-arrivals/what-s-new-this-week-1.html";


womensRouter.use(express.json());

async function getWomens(url,page) {
    const womens_data = [];
  try {
    // const womenFromDb = await womensModel.find();
    
      const response = await axios.get(url + "?p=" + page);
      const $ = cheerio.load(response.data);
      const womens = $(".item");
      womens.each(async function () {
        image = $(this).find(".product-image img").attr("data-src");
        category = $(this).find(".ph1").text();
        title = $(this).find(".product-name a").text();
        price = Number($(this).find(".price").text().replace("€", "").trim());
        womens_data.push({ image, category, title, price });   
    });

// for (let i = 0; i < womens_data.length; i++) {
//     const el = womens_data[i];
//     const arr = womenFromDb.map((el, i) => el.image);
//     if (!arr.includes(el.image)) {
//       const new_women = await new womensModel(el);
//       await new_women.save();
//       womenFromDb.push(el);
//     }
//   }
return(womens_data);
  } catch (err) {
    console.log(err);
  }
}


womensRouter.get("/", async (req, res) => {
    const page = req.query._page || 1;
  try {
    const women = await getWomens(url,page);
    console.log("women", women)
    res.send(women)
  } catch (err) {
    console.log("Something went wrong");
    console.log(err);
  }
});








module.exports = {
  womensRouter,
};
