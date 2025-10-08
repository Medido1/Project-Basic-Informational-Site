import http from 'http';
import url from 'url';
import path from 'path';
import fs from 'fs/promises';

const PORT = process.env.PORT || 3000;
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//handle Routes
const getRoute = async (req, res) => {
  if (req.method === 'GET'){
    let filePath;
    if (req.url === '/') {
      filePath = path.join(__dirname, 'public', 'index.html');
    } else if (req.url === '/about') {
      filePath = path.join(__dirname, 'public', 'about.html'); 
    } else if (req.url === '/contact-me') {
      filePath = path.join(__dirname, 'public', 'contact-me.html');
    }
    else {
      res.statusCode = 404;
      filePath = path.join(__dirname, 'public', '404.html');
    }
    const data = await fs.readFile(filePath);
    res.setHeader('Content-type', 'text/html');
    res.end(data);
  } else {
    res.writeHead(405, {'content-type': 'text/plain'});
    res.end('Method not allowed')
  }
}

const server = http.createServer(async (req, res) => {
  try {
    await getRoute(req, res)

  } catch (error) {
    res.writeHead(500, {'Content-type': 'text/plain'});
    res.end('Server Error');
  }
});

server.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`)
})