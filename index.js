const http = require('http')

const leak = []

function requestListener(req, res) {
    if (req.url === '/now') {
        let resp = JSON.stringify({ now: new Date()})
        leak.push(JSON.parse(resp))
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.write(resp)
        res.end()
    }
}

const server = http.createServer(requestListener)
server.listen(process.env.PORT || 3000)