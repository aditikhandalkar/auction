import express from 'express';
import bodyParser from 'body-parser';
import Context from './lib/database/context';
import LoginController from './lib/loginController';

const app = express();
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
const angularTimerJs = `${__dirname}/node_modules/angular-timer/dist`;
app.use('/scripts', express.static(angularTimerJs));
const momentJs = `${__dirname}/node_modules/moment`;
app.use('/scripts', express.static(momentJs));
const humanizeDurationJs = `${__dirname}/node_modules/humanize-duration`;
app.use('/scripts', express.static(humanizeDurationJs));

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

const context = new Context();

app.post('/login', (req, res) => {
  const loginController = new LoginController(context);
  loginController.login(req.body.name)
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

app.post('/closeAuction', (req, res) => {
  console.log(req.body);
  res.send({});
});

app.listen(9000, () => {
  console.log('listening on port 9000');
});
