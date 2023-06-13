const express = require("express");
const connection = require("../connection");
const router = express.Router();
require("dotenv").config();
var auth = require("../services/authentication");

router.post("/daily", (req, res) => {
    let data = req.body;
    businessidnum = req.session.user.business.idnum;
    part1 = businessidnum + ",'" + data.date + "','" + data.shift + "'";

    companyPart = new Array();
    lottoPart = new Array();
    shreportPart = new Array();
    shcountPart = new Array();
    let i = 0;
    for (let index = 0; index < 20; index+=2) {
        companyPart[index] = data.companyNames[i];
        companyPart[index+1] = data.companyAmounts[i];
        lottoPart[index] = data.lottoNames[i];
        lottoPart[index+1] = data.lottoBoxes[i];
        shreportPart[i] = data.shreportAmounts[i];
        shcountPart[i] = data.shcountAmounts[i];  
        i++;
    }
    
    companyPart = String(companyPart.map(d => `'${d}'`));
    lottoPart = String(lottoPart.map(d => `'${d}'`));
    shreportPart = String(shreportPart.map(d => `'${d}'`));
    shcountPart = String(shcountPart.map(d => `'${d}'`));

    value = part1 + "," + companyPart + "," + data.payoutTotal + "," + lottoPart + "," + shreportPart + "," + data.shiftReportTotal + "," + shcountPart + "," + data.shiftCountTotal + "," + data.overshoot;

    query = "INSERT INTO worksheet (businessid, date, shift," +
        "company1, comamount1, company2, comamount2, company3, comamount3, company4, comamount4, company5, comamount5, " +
        "company6, comamount6, company7, comamount7, company8, comamount8, company9, comamount9, company10, comamount10, paidout, " +
        "lotto1, box1, lotto2, box2, lotto3, box3, lotto4, box4, lotto5, box5, lotto6, box6, lotto7, box7, lotto8, box8, lotto9, box9, lotto10, box10, " +
        "shreport1, shreport2, shreport3, shreport4, shreport5, shreport6, shreport7, shreport8, shreport9, shreport10, shreporttotal, " + 
        "shcount1, shcount2, shcount3, shcount4, shcount5, shcount6, shcount7, shcount8, shcount9, shcount10, shcountttotal, overshoot) VALUES " + 
        "(" + value + ")";
    connection.query(query, (err, results) => {
        if (!err) {
            return res
                .status(200)
                .json({ message: "Succesfully Logged!" });
        } else {
            return res.status(500).json(err);
        }
    });
});

module.exports = router;
