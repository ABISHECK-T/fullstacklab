const http = require('http');

const server = http.createServer((req, res) => {

  if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`
      <h2>Enter Your Name</h2>
      <form method="POST" action="/submit">
        <input type="text" name="username" />
        <button type="submit">Submit</button>
      </form>
    `);
    res.end();
  }

  else if (req.method === 'POST' && req.url === '/submit') {

    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      const name = body.split('=')[1];

      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(`<h2>Hello ${name}, Welcome to the Web App!</h2>`);
      res.end();
    });
  }

});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
