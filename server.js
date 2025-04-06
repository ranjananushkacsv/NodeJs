const http = require('http');
const path = require('path');
const fsPromises = require('fs').promises;
const fs = require('fs');

const PORT = process.env.PORT || 3500

const serveFile = async(filePath,contentType,res)=>{
    try{
        const encoding = contentType.startsWith('text') || contentType === 'application/json' ? 'utf-8' : null;
        const rawData = await fsPromises.readFile(filePath, encoding);
        const data = contentType === 'application/json' ? JSON.parse(rawData) : rawData;
        res.writeHead(
            filePath.includes('404.html')?404:200, { 'Content-Type': contentType });
        res.end(contentType === 'application/json' ? JSON.stringify(data) :data);
    }catch(err){
        console.error(err);
        res.writeHead(500);
        res.end('Internal Server Error');
    }
}

const server = http.createServer((req, res) => {
    console.log(req.url, req.method);
    const extension = path.extname(req.url);

    let contentType
    switch (extension) {
        case '.html':
            contentType = 'text/html';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.jpg':
            contentType = 'image/jpeg';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.txt':
            contentType = 'text/plain';
            break;
        default:
            break;
    }

    let filePath = contentType === 'text/html' && req.url === '/'
        ? path.join(__dirname, 'views', 'index.html')
        : contentType === 'text/html' && req.url.slice(-1) === '/'
            ? path.join(__dirname, 'views', req.url, 'index.html')
            : contentType === 'text/html'
                ? path.join(__dirname, 'views', req.url)
                : path.join(__dirname, req.url)

    if(!extension && req.url.slice(-1)==='/')
        filePath = filePath + '.html'
    const fileExists = fs.existsSync(filePath)
    console.log(filePath);
    if (fileExists) 
    {
        serveFile(filePath,contentType,res);
    }
    else
    {
        switch(path.parse(filePath).base)
        {
            case 'old-page.html':
                res.writeHead(301,{'Location':'/new-page.html'});
                res.end();
                break;
            case 'www-page.html':
                res.writeHead(301,{'Location':'/'});
                res.end();
                break;
            default:
                serveFile(path.join(__dirname,'views','404.html'),'text/html',res);
                break;
            
            
            
        }
    }
})

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});