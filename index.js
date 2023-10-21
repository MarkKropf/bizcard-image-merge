const express = require('express');
const { writeFileSync, readFileSync } = require("fs");
const { degrees, PDFDocument, StandardFonts, rgb } = require("pdf-lib");

const app = express();

app.use(express.static('public'));

app.get('/', async function(req, res) {
  var qrCounter = "0001";
  var svg = firstPage = pages = pdfBytes = pdfDoc = null;
  const qrPath = "./public/qr-codes/";
  const savePath = "./public/businesscards/";
  for (let i = 250; i < 500; i++) {
    pdfDoc = await PDFDocument.load(readFileSync('./public/pdf/light.pdf'));
    var incrementvalue = (+qrCounter) +i;
    incrementvalue = ("0000" + incrementvalue).slice(-4);
    var filename = "qr_" + incrementvalue;
    var svg = await readFileSync(qrPath+filename+".svg").toString();
    console.log("Import: " + qrPath + filename + ".svg");
    var pages = pdfDoc.getPages()
    var firstPage = pages[0]
    //light
    firstPage.drawSvgPath(svg, {x:103.5, y: 58.5, color: rgb(.145,.129,.345), scale: .043 });
    //dark 
    //firstPage.drawSvgPath(svg, {x:103.5, y: 58.5, color: rgb(1,.98,.933), scale: .043 });
    var pdfBytes = await pdfDoc.save()
    writeFileSync(savePath+filename+".pdf", await pdfDoc.save());
    console.log("Export: " + savePath + filename + ".pdf");
    svg = firstPage = pages = pdfBytes = pdfDoc = null;
  }
  res.send("success!");
});

app.listen(3000, () => {
    console.log('listening to port 3000');
  }
  );