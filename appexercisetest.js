// to run such file, simply type node appexercisetest.js in the terminal, in the associated folder


const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  
  /**
   * part 1 : create and return an html form if url is strictly http://localhost:3000/
   */
   
  if (url === '/') {
    res.write('<html>');
    res.write('<head><title>Enter Message</title><head>');
    res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
    //  'action' prop will redirect to the 'http://localhost:3000/message' url when submitting form
    //  Giving a name prop here to the <input/> is an IMPORTANT PART HERE, 
    //   as it will then help us reading the content of the data sent here and received in the part 3. 
    // because in part 3, such form will return  'message=_______' after parsing its req  
    res.write('</html>');
    return res.end();
  }
  
  /**
   * part 2 : part 1, if form is submited, will lead us at this point (ie http://localhost:3000/message url with a post method
   */
   
  if (url === '/message' && method === 'POST') {
    const body = [];
    //Buffer is like a bus stop. so we will concat all the chunks when the bus stops, (bus stop = ie when the data coming from req has been totally read)
    req.on('data', (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    
    req.on('end', () => { // 'end', ie when data has been totally read, means that we are at the bus stop (ie buffer)
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split('=')[1]; // message will be something like 'message=_______' confere part 1 <input  name='message'/>
      fs.writeFileSync('message.txt', message);
    });
    
    res.statusCode = 302;
    res.setHeader('Location', '/'); // will redirect to / url
    return res.end();
  }
  
  /**
   * part 3 : for all other url (for ex: http://localhost:3000/coconut)
   */
  
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>My First Page</title><head>');
  res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
  res.write('</html>');
  res.end();

  // process.exit() => to leave and shut down the server, ie leaving the perpetual eventloop 
});

server.listen(3000, ()=>{console.log('server running on port 3000')});