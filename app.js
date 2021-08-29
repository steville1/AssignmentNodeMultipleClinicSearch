//const winston = require("winston");
const config = require("config");
const express = require('express');
const fs=require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

require('dotenv').config();



// import routes
const clinicsRoute = require('./routes/clinics');

// app
const app = express();

// middlewares

app.use(bodyParser.json());
app.use(cors());

//

const swaggerOptions={
	swaggerDefinition:{
		info:{
			title:"Clinic API",
			description:"Search In Clinic Provider",
			contact:{
				name:"Ikani Stephen"
			},
			servers:["http://localhost:4300"]

		}

	},
	//['.routes/*.js']
	//apis:['./routes/*.js']
    apis:['app.js']

};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))
// routes middleware
/**
 * @swagger
 * /api/SearchByMultipleClinic:
 *  get:
 *    parameters:
 *      -  in: query
 *         name: clinicName
 *         type: string
 *         required: false 
 *      -  in: query
 *         name: state
 *         type: string
 *         required: false
 *      -  in: query
 *         name: from
 *         type: string
 *         required: false
 *      -  in: query
 *         name: to
 *         type: string
 *         required: false           
 *    description: Use to Search in Multiple Clinic Providers
 *    responses:
 *      '200':
 *        description: A successful response
 */

app.use('/api', clinicsRoute);


const port = process.env.PORT || config.get("port");
const server = app.listen(port, () =>
 console.log(`Listening on port ${port}...`)
);
module.exports = server;