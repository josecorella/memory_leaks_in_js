import express, { Response } from 'express'
import { kmsEncryptStream } from './memory'

const app  = express()

app.get('/', (req, res) => {
    res.write("ANother Test")
    res.write("Test")
    res.send()
    console.log("Back in home")
})

app.get('/readRandom_1mb', (req, res) => {
    res.write("Attempt to read random")
    readFile('./random_1mb.txt')
    res.send()
})

app.listen(3000, () => {
    console.log("Listening on port 3000");
    
})

async function readFile(filename:string) {
    await kmsEncryptStream(filename);
}