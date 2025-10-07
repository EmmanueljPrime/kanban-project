import express from "express"
import cors from "cors"
import projectsRouter from "./routes/projects"

const app = express()

app.use(cors())
app.use(express.json())

// Ping Serveur
app.get("/health", (_,res)=>res.json({ok:true}))

// Endpoint pour tout les projets
app.use('/projects', projectsRouter)

// Démarrage du serveur
const port = Number(process.env.PORT || 4000)
app.listen(port, ()=> {
  console.log(`API started on port ${process.env.PORT}`)
})
