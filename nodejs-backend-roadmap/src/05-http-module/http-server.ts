import http, { IncomingMessage, ServerResponse } from 'http'

const homeHandler = (req: IncomingMessage, res: ServerResponse) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Welcome to the homepage!');
};

const getProductsHandler = (req: IncomingMessage, res: ServerResponse) => {
    res.writeHead(200, {
        "Content-Type": 'application/json'
    });
    res.end(JSON.stringify({ "Products": ["Laptop", "Mouse"] }));
};

const createProductHandler = (req: IncomingMessage, res: ServerResponse) => {
    const data: Buffer[] = [];
    req.on('data', (chunk: Buffer) => {
        data.push(chunk);
    });
    req.on('end', () => {
        try {
            const result = Buffer.concat(data).toString();
            const newProduct = JSON.parse(result);
            console.log('Received new product:', newProduct);
            res.writeHead(201, {
                'Content-Type': "application/json"
            });
            res.end(JSON.stringify({ "Message": "Product created successfully" }));
        } catch (err) {
            console.error(err);
            res.writeHead(400, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify({ 'message': "The payload is not correct, there was an error with your request" }));
        }
    });
};

const routes = [
    {
        method: 'GET',
        url: '/',
        handler: homeHandler
    },
    {
        method: 'GET',
        url: '/products',
        handler: getProductsHandler
    },
    {
        method: 'POST',
        url: '/products',
        handler: createProductHandler
    }
];

const server = http.createServer((req, res) => {
    const foundRoute = routes.find((route) => route.method === req.method && route.url === req.url);

    if (foundRoute) {
        foundRoute.handler(req, res);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
})

server.listen(3000, () => {
    console.log('The server started on port 3000')
})