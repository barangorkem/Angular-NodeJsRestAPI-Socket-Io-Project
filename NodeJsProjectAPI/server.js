const http=require('http');
const app=require('./app');
const port=process.env.PORT || 3000;

const server = http.Server(app);
require("./socket").init(server);


server.listen(port);
