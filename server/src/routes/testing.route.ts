import express from "express"
import { getLatLng } from "../../tools/computeBirthChart.tool.js"



const router = express.Router()

router.post("/geocode",async (req,res)=>{
    const {location} = req.body
    const result = await getLatLng(location)
    res.json(result)
})

export default router
