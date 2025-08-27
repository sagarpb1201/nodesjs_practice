import * as http from "http";
const server = http.createServer((req, res) => {
    res.end('Hello');
});
server.listen(() => { console.log(`Server listening on port:3000`); });
//# sourceMappingURL=server.js.map