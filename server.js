const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv')
const morgan = require('morgan')
const connectDB = require('./config/db')

// Load env vars
dotenv.config({ path: './config/config.env' })

// Connect DB
connectDB()

// Load Route files
const companies = require('./routes/companies')

// Initialize app with express
const app = express()

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

const PORT = process.env.PORT || 5000;

// Mount routers
app.use('/api/v1/companies', companies)

// app.get('/', (req, res) => {
//     res.status(200).json({
//         title: 'Landing page',
//         msg: 'Hello there json, from express server'
//     })
// })

const server = app.listen((PORT), () => {
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold);
});
