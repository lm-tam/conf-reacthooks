import * as path from 'path';
import * as fs from 'fs'

const { promisify } = require('util')
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export default async function handler(req, res) {
    const method = req?.method
    const id = parseInt(req?.query.id)
    const recordFromBody = req?.body
debugger
    if (method !== 'PUT') {
        res.status(501).send(`Method ${method} is not support.`)
    } else {
        const jsonFile = path.resolve('./', 'db.json')
        try {
            const readFileData = await readFile(jsonFile)
            await delay(1000)
            const speakers = JSON.parse(readFileData).speakers
            if (!speakers) {
                res.status(404).send('Error: request fail with status 404.')
            } else {
                const newSpeakersArray = speakers.map(rec => rec.id === id ? recordFromBody : rec)
                writeFile(jsonFile, JSON.stringify({speakers : newSpeakersArray}, null, 2))
                res.status(200).json(recordFromBody)
                console.log(`PUT /api/speakers/${id} status: 200`)
            }
        } catch (e) {
            console.log('GET /api/speakers error', e)
        }
    }
}