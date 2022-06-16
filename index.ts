import express, { Response } from 'express'
import { kmsDecryptStream, kmsEncryptStream } from './memory'

const app  = express()

app.get('/', (req, res) => {
    res.write("Test")
    res.send()
    console.log("Back in home")
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

app.listen(3000, () => {
    console.log("Listening on port 3000");
    
})

async function readFile(filename:string) {
    await kmsEncryptStream(filename);
}

async function readEncryptedFile(filename: string) {
    await kmsDecryptStream(filename)
}