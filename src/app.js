import express from "express";
import session from "express-session";
import MongoStore from 'connect-mongo'
import handlebars from 'express-handlebars'

import viewsProductsRouter from "./routers/views.router.js";
import productRouter from "./routers/product.router.js"
import userRouter from "./routers/user.router.js"
import mongoose from "mongoose";

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

const MONGO_URI = 'mongodb+srv://mauro:mauro@ecommerce.wnnj4ej.mongodb.net/'
const MONGO_DB_NAME = 'clase19'


try {
    await mongoose.connect(MONGO_URI + MONGO_DB_NAME)
    
    app.use(session({
        store: MongoStore.create({
            mongoUrl: MONGO_URI,
            dbName: MONGO_DB_NAME,
            mongoOptions: {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        }),
        secret: 'pepe',
        resave: true,
        saveUninitialized: true
    }))


    app.engine('handlebars', handlebars.engine())
    app.set('views', './src/views')
    app.set('view engine', 'handlebars')

    app.use("/", viewsProductsRouter);

    app.use('/api/user',
        userRouter
    );
    app.use("/api/products",
        productRouter
    );


    app.listen(8080, () => console.log("Server up"))

} catch (err) {
    console.log(err)
}

