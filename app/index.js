import express from 'express';

const app = express();

app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res) => {
  console.log(__dirname);
  res.sendFile(`${__dirname}/index.html`);
});

app.listen(9000, () => {
  console.log('listening on port 9000');
});
