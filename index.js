const PORT = 6000;
const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

async function currencyScraper() {
    const url = "https://www.bi.go.id/id/statistik/informasi-kurs/transaksi-bi/default.aspx";
    const currArray = [];
    await axios(url).then((response) => {
      const html_data = response.data;
      const $ = cheerio.load(html_data);
  
      const selectedElem =
        " div.card-body> div > #ctl00_PlaceHolderMain_g_6c89d4ad_107f_437d_bd54_8fda17b556bf_ctl00_GridView1 > table > tbody > tr";
      const keys = [
        "Currency",
        "Value",
        "Sell",
        "Buy",
        "Graph"
      ];
  
      $(selectedElem).each((parentIndex, parentElem) => {
        let keyIndex = 0;
        const currDetail = {};
        if (parentIndex <= 100) {
          $(parentElem)
            .children()
            .each((childId, childElem) => {
              const value = $(childElem).text();
              if (value) {
                currDetail[keys[keyIndex]] = value;
                keyIndex++;
              }
            });
          currArray.push(currDetail);
        }
      });
    });
    return currArray;
  }
  
  app.post("/api/currency", async (req, res) => {
    try {
      const currency = await currencyScraper();

      const convertedData = currency.map(item => ({
        Currency: item.Currency.replace(/\s/g, ''),
        Rate: (parseFloat(item.Sell.replace(',', '').replace('.','')) + parseFloat(item.Buy.replace(',', '').replace('.',''))) / (200 * parseFloat(item.Value))
      }));

      var output = {
        "status" : true,
        "message": "Get data successfull",
        "data": convertedData
      }

      res.contentType('application/json').status(200)
      var valued = JSON.stringify(output)
      res.send(valued)
      
    } catch (err) {
      return res.status(500).json({
        err: err.toString(),
      });
    }
  });

  app.post("/api/currency-count", async (req, res) => {
    const {in_currency, in_values}  = req.body;
    const dataFounded = [];

    try {
      const currency = await currencyScraper();

      const convertedData = currency.map(item => ({
        Currency: item.Currency.replace(/\s/g, ''),
        Rate: (parseFloat(item.Sell.replace(',', '').replace('.','')) + parseFloat(item.Buy.replace(',', '').replace('.',''))) / (200 * parseFloat(item.Value))
      }));

      const searchData = convertedData.find(e=>e.Currency == in_currency)
      if (searchData) {
        const calculatedRate = searchData.Rate * in_values;
        dataFounded.push({
          in_currency: searchData.Currency,
          in_rate: searchData.Rate,
          in_values: in_values,
          in_rupiah: calculatedRate,
        });
      } else {
        res.json({ error: "Currency with AUD not found" });
      }

      var output = {
        "status" : true,
        "message": "Get data successfull",
        "data": dataFounded
      }

      res.contentType('application/json').status(200)
      var valued = JSON.stringify(output)
      res.send(valued)
      
    } catch (err) {
      return res.status(500).json({
        err: err.toString(),
      });
    }
  });
  
  app.listen(PORT, () =>
    console.log(`The server is active and running on port ${PORT}`)
  );