//This is the minimal express server. 
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const db = require('./db/db-connection.js'); 

const app = express();
const PORT = 8080;

// Configuring cors middleware
app.use(cors());
app.use(express.json()); //req.body

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// //creates an endpoint for the route `/`
app.get("/", (req, res) => {
    res.json("Hello Techtonica 2023 H2 to your Server for Eventonica");
  });


app.get('/api/events', async (req, res) =>{

    //real connection with the DB eventonica
    try{
        const { rows: events } = await db.query('SELECT * FROM events');
        //console.log("in the sercer",events)
        res.send(events);

    } catch(error){
        console.log(error);
        return res.status(400).json({error});

    }    
})

//CREATE AN EVENT
//Now you can add a new event through Postman. You don't need a UI
app.post("/api/events", async (req, res) => {
    try {
        const {title, location, eventtime} = req.body; 

        const newEvent = await db.query (
            "INSERT INTO events (title, location, eventtime) VALUES ($1, $2, $3) RETURNING *", //RETURNING:  RETURNS ALL DATA
                [title, location, eventtime]
        );

        res.json(newEvent.rows[0]);
    }
    catch (err) {
        console.error(err.message)
        res.status(400).json({err});
    }
})



app.listen(PORT, () => console.log(`Hola! Server running on Port http://localhost:${PORT}`));