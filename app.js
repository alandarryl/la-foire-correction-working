const express = require('express');
const connectDB = require('./config/db_mongo');
const ENV  = require('./config/env');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');

// IMPORT ROUTES
const articleRouter = require('./router/Article.router');
const userRouter = require('./router/User.router');
const avisRouter = require('./router/Avis.router');

// CONNECTION MONGO
connectDB(ENV.MONGO_URI, ENV.DB_NAME)

// MIDDLEWARES
app.use(cookieParser());
app.use(express.json());
app.use(cors());

// PREFIX
app.use('/api/article', articleRouter);
app.use('/api/user', userRouter);
app.use('/api/avis', avisRouter);

// MIDDLEWARE DE GESTION D'ERREURS
app.use((error, req, res, next) => {
    const status = error.status || 500
    const message = error.message || "Une erreur est survenue."
    const detail = error.details || null 

    res.status(status).json({
        error: {
            status,
            message,
            detail
        }
    }) 
})


module.exports = app