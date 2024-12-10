require('dotenv').config();
const express = require('express');
const configViewEngine = require('./config/viewEngine');
const apiRoutes = require('./routes/api');
// const connection = require('./config/database');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

const http = require("http");
const server = http.createServer(app);

const socketIo = require("socket.io")(server, {
    cors: {
        origin: "*",
    }
}); 

//config cors
app.use(cors());

//config req.body
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//config template engine
configViewEngine(app);

app.use('/', apiRoutes);

(async () => {
    try {
        // await connection();

        server.listen(port, () => {
            console.log(`Backend Nodejs App listening on port ${port}`)
        })
    } catch (error) {
        console.log(">>> Error connect tp DB: ", error)
    }
})()