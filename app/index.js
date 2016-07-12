import express from 'express';

const app = express();

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
  console.log(__dirname);
  res.sendFile(`${__dirname}/index.html`);
});

app.listen(9000, () => {
  console.log('listening on port 9000');
});
