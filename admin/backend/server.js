require('dotenv').config();
const express = require("express");
const cors = require("cors");
const apiRoutes = require('./routes/api');
const connectDB = require('./config/database');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", apiRoutes);

const startServer = async () => {
    try {
        await connectDB();

        app.listen(port, () => {
            console.log(`Backend Nodejs App listening on port ${port}`);
        });

    } catch (error) {
        console.log(">>> Error connecting to DB:", error);
    }
};

startServer();