import  'dotenv/config'
import express from "express"
import cors from "cors"
import helmet from "helmet"

const app = express()

const PORT = process.env.PORT || 8000





///middlewares
app.use(cors())
app.use(helmet())


app.get("/", (req,res)=>{
    res.json({
        message: "got it"
    })
})


app.listen(PORT, error=>{
    error ? console.log(error)
    :
    console.log(`server running at: http://localhost:${PORT}`)
})