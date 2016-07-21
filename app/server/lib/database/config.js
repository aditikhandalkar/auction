export const config = {
  client: 'sqlite3',
  connection: {
    filename: './auction.sqlite'
  },
  pool: {
    min: 1,
    max: 7
  }
};
