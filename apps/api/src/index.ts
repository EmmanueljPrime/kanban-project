import express from "express"
import cors from "cors"

const app = express()

app.use(cors())
app.use(express.json())

app.get("/health", (_,res)=>res.json({ok:true}))

const port = Number(process.env.PORT || 4000)
app.listen(port, ()=> {
  console.log(`API started on port ${process.env.PORT}`)
})
