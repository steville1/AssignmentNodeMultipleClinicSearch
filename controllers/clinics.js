const router = require('express').Router();
const fetch = require('node-fetch');
const { response} = require('../utils');
class ClinicsController {
    async validateClinics(req, res) {
        const api_url = 'https://storage.googleapis.com/scratchpay-code-challenge/dental-clinics.json'; 
        const clinicName = req.query.name;
        //const clinic = clinicName.split(",");
        console.log("Clinic Name"+clinicName.length);
        const state=req.query.stateName;
        console.log("State Name"+state.length);  
        const contentList={
            content:[] 
        };
        const resp = await fetch(api_url);
        const data = await resp.json();
        contentList.content=data;
       
            const resultData = contentList.content.filter(a=>a.name===clinicName || a.stateName===state);
            console.log(resultData);
           return response(res, resultData, 200);       
    };
}
module.exports = ClinicsController;