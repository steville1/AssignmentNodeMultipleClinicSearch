const router = require('express').Router();
const e = require('express');
const fetch = require('node-fetch');
const NodeCache = require( "node-cache" );
const { response} = require('../utils');

class ClinicsController {

    async validateClinics(req, res) {

        const clinicName = req.query.clinicName ?? "";
        const state = req.query.state ?? "";
        const from = req.query.from ?? "";
        const to = req.query.to ?? "";

        let dataSource = [];
        const key = "datasource"; 
        const ttlSeconds = 60 * 60 * 24; // 1 day
        const dataStoreCache = new NodeCache({ stdTTL: ttlSeconds, checkperiod: ttlSeconds * 0.2, useClones: false });
       
        if (dataStoreCache.get(key))
        {
            console.log("cached value", dataStoreCache.get(key));
            dataSource = dataStoreCache.get(key);
        }
        else
        {
            const api_url = 'https://storage.googleapis.com/scratchpay-code-challenge/dental-clinics.json'; 
            const api_url2 = 'https://storage.googleapis.com/scratchpay-code-challenge/vet-clinics.json'; 

            const respSource1 = await fetch(api_url);
            const dataSource1 = await respSource1.json();

            const respSource2 = await fetch(api_url2);
            const dataSource2 = await respSource2.json();

            for(let data of dataSource1){
                dataSource.push({
                    clinicName: data.name,
                    state: data.stateName,
                    from: data.availability.from,
                    to: data.availability.to
                });
            }
            
            for(let data of dataSource2){
                dataSource.push({
                    clinicName: data.clinicName,
                    state: data.stateCode,
                    from: data.opening.from,
                    to: data.opening.to
                });
            } 
           
            dataStoreCache.set(key, dataSource, ttlSeconds);
        }        

       let resultData = dataSource;

       if (clinicName.trim() !== ""){
           resultData = resultData.filter(
                a => a.clinicName.toLowerCase().startsWith(clinicName.toLowerCase())
           );
       }
       if (state.trim() !== ""){
            resultData = resultData.filter(
                a => a.state.toLowerCase().startsWith(state.toLowerCase())
           );
       }
       if (from.trim() !== ""){
            resultData = resultData.filter(
                a => a.from >= from
            );
       }
       if (to.trim() !== ""){
            resultData = resultData.filter(
                a => a.to <= to
            );
        }

        return response(res, resultData, 200);       
    };

}

module.exports = ClinicsController;