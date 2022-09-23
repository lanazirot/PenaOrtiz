const http = require('http')

const server = http.createServer((req,res)=> {
    res.write('Http server')
    res.end()
})

server.listen(8081, console.log('Corriendo en el 8089'));