import * as path from 'path';
import * as fs from 'fs'

const { promisify } = require('util')
const readFile = promisify(fs.readFile)
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export default async function handler(req, res) {
    //res.status(200).send(JSON.stringify(speakerData, null, 2))
    const jsonFile = path.resolve('./', 'db.json')
    debugger
    try {
        const readFileData = await readFile(jsonFile)
        await delay(1000)
        const speakers = JSON.parse(readFileData).speakers
        if (!speakers) {
            res.status(404).send('Error: request fail with status 404.')
        } else {
            res.setHeader('Content-Type', 'application/json')
            res.status(200).send(JSON.stringify(speakers, null, 2))
            console.log('GET /api/speakers status: 200')
        }
    } catch (e) {
        console.log('GET /api/speakers error', e)
    }
}