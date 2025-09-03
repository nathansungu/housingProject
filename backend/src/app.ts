import express from 'express'

const app = express()

const port = process.env.PORT|| 4000
app.listen(port, (e)=>{
    e?console.log(e):console.log(`app running on port ${port}`)
})