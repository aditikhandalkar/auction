import express from 'express';

const app = express();

app.use(express.static(`${__dirname}/public`));
app.use('/scripts', express.static(`${__dirname}/client/`));

const angular = `${__dirname}/node_modules/angular/`;
app.use('/scripts', express.static(angular));

app.get('/', (req, res) => {
  console.log(__dirname);
  res.sendFile(`${__dirname}/index.html`);
});

app.listen(9000, () => {
  console.log('listening on port 9000');
});
