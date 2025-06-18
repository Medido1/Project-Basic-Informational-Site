const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {
  //build file path
  let filePath = path.join(
    __dirname,
    req.url === '/' ? 'index.html' : req.url
  )

  // Intial content type
  let contentType = 'text/html'

  // file Extension
  let extName = path.extname(filePath)
  if (!extName){
    filePath += '.html'
    extName = '.html'
  }

  //Read file
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // page not found
        fs.readFile(path.join(__dirname, '404.html'), (err, content) => {
          res.writeHead(200, {'Content-Type' : 'text/html'})
          res.end(content, 'utf8')
        })
      } else {
        // some server error
        res.writeHead(500);
        res.end(`Server error : ${err.code}`)
      }
    } else {
      //sucess
      res.writeHead(200, {'Content-Type': contentType})
      res.end(content, 'utf8')
    }
  })
})

const PORT = process.env.PORT || 8080

server.listen(PORT, () => console.log(`Server running on port: ${PORT}`))