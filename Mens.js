const cheerio = require("cheerio");

const axios = require("axios");

const express = require("express");
const { mensModel } = require("./models/Mens.model");

const mensRouter = express.Router();





const url = "https://www.mytheresa.com/int_en/men/new-arrivals/current-week.html";
const product_data = [];

async function getMens(url) {
    try {
  
        for(let i=1; i<=5; i++) {
            const response = await axios.get(url+"?p="+i);
            const $=cheerio.load(response.data);
            const product = $(".item");
            product.each(async function() {
             image = $(this).find(".product-image img").attr();
             category = $(this).find(".ph1").text();
             title = $(this).find(".pa1-rm").text();
             price = $(this).find(".price").text();
        
             product_data.push({image, category,title, price});

             const mens_data = new productModel({image, category, title, price});
       await mens_data.save();
       res.send("Product added successfully");

            });
        }
        
       console.log(product_data);


    }
    catch(err) {
        console.log(err);
    }
}

getMens(url);