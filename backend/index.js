const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const {connectToDataBase} = require("./server/database/dbConnection");
const {loggingRoutes} = require("./server/middlewares/loggingRoutes");
const {errorHandling, notFoundPage} = require("./server/middlewares/errorHandling");

const bookRoutes = require("./server/routes/bookRoute"); 
const authorRoutes = require("./server/routes/authorRoute"); 
const userRoutes = require("./server/routes/userRoute"); 

// initialize our application
const app = express();
dotenv.config();
app.use(cors());

// apply middlewares
app.use(express.json());

//call the connection to db
connectToDataBase();

// custom middleware 
app.use(loggingRoutes)

// Define Our route 
app.use("/api/v1/books", bookRoutes);
app.use("/api/v1/authors", authorRoutes);
app.use("/api/v1/auth", userRoutes);

// custom middlewares
app.use(notFoundPage);
app.use(errorHandling);


// Running the application
const PORT = process.env.PORT;
const MODE = process.env.MODE;
app.listen(PORT, () => {
    console.log(`The application is running on ${MODE} ${MODE === "devellopmemt_mode" ? `=> http://localhost:${PORT}` : "" }`);
});
