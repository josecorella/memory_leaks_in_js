import express, { Response } from 'express'
import { kmsDecryptStream, kmsEncryptStream } from './memory'

const app  = express()
const leak = []

app.get('/', (req, res) => {
    res.write("Test")
    res.send()
    console.log("Back in home")
})

app.get('/now', (req, res) => {
    let resp = JSON.stringify({ now: new Date() })
    leak.push(JSON.parse(resp))
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.write(resp)
    res.end()
})

app.get('/readRandom_1mb', (req, res) => {
    res.write("Attempt to encrypt random")
    readFile('./random_1mb.txt')
    res.send()
})

app.get('/readRandom_1mbEnc', (req, res) => {
    res.write("Attempt to decrypt random")
    readEncryptedFile('./random_1mb.txt.encrypted')
    res.send()

})

app.get('/readRandom_1gb', (req, res) => {
    res.write("Attempt to encrypt large random")
    readFile('./rand_1gb.txt')
    res.send()
})

app.get('/readRandom_1gbEnc', (req, res) => {
    res.write("Attempt to encrypt large random")
    kmsDecryptStream('./rand_1gb.txt.encrypted')
    res.send()
})

app.listen(3000, () => {
    console.log("Listening on port 3000");
})

async function readFile(filename:string, framesize?:number) {
    await kmsEncryptStream(filename, framesize);
}

async function readEncryptedFile(filename: string) {
    await kmsDecryptStream(filename)
}