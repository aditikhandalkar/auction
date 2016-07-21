import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import socketio from 'socket.io';
import Context from './lib/database/context';
import LoginComponent from './lib/loginComponent';
import AuctionComponent from './lib/auctionComponent';
import path from 'path';

const app = express();
const server = http.createServer(app);
const io = socketio(server);
io.on('connection', function(socket) {
  socket.emit('greeting', {message: 'hello world'});
});

app.use(bodyParser.json());
const publicFolder = path.resolve(__dirname, '../public');
app.use(express.static(publicFolder));

app.get('/', (req, res) => {
  const indexFile = path.resolve(__dirname, '../client/index.html');
  res.sendFile(indexFile);
});

const context = new Context();
const auctionComponent = new AuctionComponent(context, io);

app.post('/login', (req, res) => {
  const comp = new LoginComponent(context);
  comp.login(req.body.name)
  .then(user => {
    res.send({
      user,
      message: 'logged in',
      isError: false
    });
  })
  .catch(err => {
    res.send({
      message: err,
      isError: true
    });
  });
});

app.post('/queueAuction', (req, res, next) => {
  console.log(req.body);
  auctionComponent.queueAuction(req.body)
  .then(id => {
    res.send({
      id
    });
  })
  .catch(next);
});

app.post('/placeBid', (req, res, next) => {
  console.log(req.body);
  auctionComponent.placeBid(req.body)
  .then(() => {
    res.send({
    });
  })
  .catch(next);
});

// this method should be removed.
app.get('/auction', (req, res, next) => {
  auctionComponent.getAuction()
  .then(auction => {
    res.send(auction);
  })
  .catch(next);
});

server.listen(9000, () => {
  console.log('listening on port 9000');
});
