import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import socketio from 'socket.io';
import Context from './lib/database/context';
import LoginComponent from './lib/loginComponent';
import AuctionComponent from './lib/auctionComponent';

const app = express();
const server = http.createServer(app);
const io = socketio(server);
io.on('connection', function(socket) {
  socket.emit('greeting', {message: 'hello world'});
});

app.use(bodyParser.json());
app.use(express.static(`${__dirname}/public`));
app.use('/scripts', express.static(`${__dirname}/client/`));

const jqueryJs = `${__dirname}/node_modules/jquery`;
app.use('/scripts', express.static(jqueryJs));
const angularJs = `${__dirname}/node_modules/angular/`;
app.use('/scripts', express.static(angularJs));
const bootstrapJs = `${__dirname}/node_modules/bootstrap/dist/js`;
app.use('/scripts', express.static(bootstrapJs));
const bootstrapCss = `${__dirname}/node_modules/bootstrap/dist/css`;
app.use('/styles', express.static(bootstrapCss));

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
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
