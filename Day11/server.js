const http = require('http');

// Get the port from command line arguments or default to 3001
const port = 3002;

const requestHandler = (req, res) => {
    res.end(`Hello World! Server is listening on port ${port}`);
};

const server = http.createServer(requestHandler);

// Start the server and listen on the specified port
server.listen(port, (err) => {
    if (err) {
        return console.log('Something went wrong:', err);
    }
    console.log(`Hello World! Server is listening on port ${port}`);
});