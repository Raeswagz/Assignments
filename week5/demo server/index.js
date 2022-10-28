const path = require('path')
const http = require('http')
const fs = require('fs')

const server = http.createServer((request, response) => {
    // if (request.url === '/') {
    //        let filePath = path.join(__dirname, 'public', 'index.html')
    //        fs.readFile(filePath, 'UTF8', (err, data) => {
    //         response.writeHead(200, {'Content-Type': 'text/html'})
    //         response.end(data)
    //        })
    // } 
    // if (request.url === '/index2.html') {
    //     let filePath = path.join(__dirname, 'public', 'index2.html')
    //     fs.readFile(filePath, 'UTF8', (err, data) => {
    //      response.writeHead(200, {'Content-Type': 'text/html'})
    //      response.end(data)
    //     })

    let filePath = path.join(__dirname, 'public', request.url === '/' ? 'index.html': request.url)
    let contentType = getContentType(filePath) || 'text/html'
    let emptyPagePath = path.join(__dirname, 'public', '404.html')
    fs.readFile(filePath, 'UTF8', (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                 fs.readFile(emptyPagePath, 'UTF8', (err, content) => {
                    response.writeHead(200, {'Content-type': contentType})
                    response.end(content)
                 })
            }else {
                response.writeHead(500)
                response.end('A server error has occured')
            }
        }

        if (!err){
            response.writeHead(200, {'Content-Type': contentType})
            response.end(content)
        }
    })          
})

const getContentType = (filePath) => {
    let extname = path.extname(filePath)
    if (extname === '.js'){
        return 'text/javascript'
    }
    if(extname === '.css'){
        return 'text/css'
    }
    if(extname === '.png'){
        return 'image/png'
    }
    if(extname === '.jpg'){
        return 'image/jpg'
    }
}
const port = 5000

server.listen(port, () => {
    console.log(`server is running on ${port}`)
})