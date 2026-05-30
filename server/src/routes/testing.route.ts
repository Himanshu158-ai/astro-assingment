import express from "express"
import { geocodePlace } from "../../tools/geocode.tool.js"
import {computeBirthChart} from "../../tools/computeBirthChart.tool.js"
import {knowledgeLookup} from "../../tools/knowledgeLookup.tool.js"



const router = express.Router()

router.post("/geocode", async (req, res) => {
    const { location } = req.body
    const result = await geocodePlace(location)
    res.json(result)
})

router.post("/birthchart", async (req, res) => {
    console.log(req.body)
    const result = await computeBirthChart(req.body)
    res.json(result)
})

router.post("/lookup", async (req, res) => {
    const { sign } = req.body
    console.log(sign)
    const result = await knowledgeLookup(sign)
    res.json(result)
})

export default router
