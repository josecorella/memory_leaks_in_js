const { register } = require('ts-node')
const { compilerOptions } = require('./tsconfig.json')
const  http  = require('http')

const leak = []

function requestListener(req, res) {
    if (req.url === '/now') {
        let resp = JSON.stringify({ now: new Date()})
        leak.push(JSON.parse(resp))
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.write(resp)
        res.end()
    } else if (req.url === '/readRandom') {
        // function kmsReadFile() {
        //     return new Promise(resolve => {
        //         resolve(runTS('./memory.ts'))
        //     });
        // }

        // async function readingFile() {
        //     console.log("in read file");
        //     let byteByByte = await kmsReadFile();
        //     res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
        //     res.end()
        // }
        console.log("in readRandom");
        // readingFile()
    } else {
        res.end('Invalid request')
    }
}

async function runTS(filePath) {
    register({ compilerOptions });

    const result = require(filePath);
    return result.default || result;
}

const server = http.createServer(requestListener)
server.listen(process.env.PORT || 3000)