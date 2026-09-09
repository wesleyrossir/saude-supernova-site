const http = require('http');
const fs = require('fs');
const path = require('path');
const root = __dirname;
const mime = {'.html':'text/html','.css':'text/css','.js':'application/javascript','.png':'image/png','.jpg':'image/jpeg','.ico':'image/x-icon','.svg':'image/svg+xml'};
http.createServer((req,res)=>{
  let p = req.url.split('?')[0];
  if (p==='/') p='/index.html';
  const file = path.join(root, p);
  fs.readFile(file, (err,data)=>{
    if (err) { res.writeHead(404); res.end('Not found'); return; }
    res.writeHead(200, {'Content-Type': mime[path.extname(file)]||'text/plain'});
    res.end(data);
  });
}).listen(8123, ()=>console.log('serving on 8123'));
