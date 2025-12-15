// import { cookieParser } from 'cookie-parser';
import express from 'express'
import router from './routes/index.routes'
import cookieParser from 'cookie-parser'
import { errorHandler } from './middlewares/errorHandler'

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use("/api", router)
// app.use(errorHandler())

// app.use(cookieParser());

const port = process.env.PORT|| 4000
app.listen(port, (e)=>{
    e?console.log(e):console.log(`app running on port ${port}`)
})