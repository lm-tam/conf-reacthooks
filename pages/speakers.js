import React from 'react'
import App from '../src/App';
import * as fs from 'fs'
import * as path from 'path'

export const InitialSpeakerDataContext = React.createContext()

export async function getStaticProps() {
  const { promisify } = require('util')
  const readFile = promisify(fs.readFile)
  const jsonFile = path.resolve('./', 'db.json')
  let initialSpeakerData
  try {
    const readFileData = await readFile(jsonFile)
    initialSpeakerData = JSON.parse(readFileData).speakers
  } catch (e) {
    console.log('/api/speakers error', e)
  }

  return { revalidate: 1, props: { initialSpeakerData } }
}

function speakers({initialSpeakerData}) {

  return (
      <InitialSpeakerDataContext.Provider value={initialSpeakerData}>
        <App pageName="Speakers" />
      </InitialSpeakerDataContext.Provider>
  )
}

export default speakers;
