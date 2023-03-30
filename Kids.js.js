const cheerio = require("cheerio");

const axios = require("axios");
const fs = require("fs");

const url = "https://www.mytheresa.com/int_en/new-arrivals/what-s-new-this-week-1.html";

const product_data = [];

async function getMens(url) {
    try {
  
        for(let i=1; i<=5; i++) {
            const response = await axios.get(url+"?p="+i);
            const $=cheerio.load(response.data);
            const product = $(".item");
            product.each(function() {
             image = $(this).find(".product-image img").attr();
             category = $(this).find(".ph1").text();
             title = $(this).find(".pa1-rm").text();
             price = $(this).find(".price").text();
        
             product_data.push({image, category,title, price});
            });
        }
        
       console.log(product_data);
       const kids_data = JSON.stringify(product_data);
       fs.appendFileSync('db.json', kids_data, 'utf8');

    }
    catch(err) {
        console.log(err);
    }
}

getMens(url);