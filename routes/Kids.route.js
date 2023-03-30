const express = require("express");
const cheerio = require("cheerio");
const axios = require("axios");
const { kidsModel } = require("../models/Kids.model");
const kidsRouter = express.Router();

const url =
  "https://www.mytheresa.com/int_en/kids/new-arrivals/current-week.html";


kidsRouter.use(express.json());

async function getkids(url,page) {
    const kids_data = [];
  try {
      const response = await axios.get(url + "?p=" + page);
      const $ = cheerio.load(response.data);
      const kids = $(".item");
      kids.each(async function () {
        image = $(this).find(".product-image img").attr("data-src");
        category = $(this).find(".ph1").text();
        title = $(this).find(".product-name a").text();
        price = Number($(this).find(".price").text().replace("€", "").trim());
        kids_data.push({ image, category, title, price });   
    });

// for (let i = 0; i < kids_data.length; i++) {
//     const el = kids_data[i];
//     const arr = kidFromDb.map((el, i) => el.image);
//     if (!arr.includes(el.image)) {
//       const new_kid = await new kidsModel(el);
//       await new_kid.save();
//       kidFromDb.push(el);
//     }
//   }
return(kids_data);
  } catch (err) {
    console.log(err);
  }
}


kidsRouter.get("/", async (req, res) => {
    let page = req.query._page || 1;
  try {
    const kid = await getkids(url,page);
    console.log("kid", kid)
    res.send(kid)
  } catch (err) {
    console.log("Something went wrong");
    console.log(err);
  }
});



module.exports = {
  kidsRouter,
};
