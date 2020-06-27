const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const sql = require('mssql');

const app = express();

app.use((req, res, next) => {
  debug('My middleware');
  next();
});

// Debugging like papertail

app.use(morgan('tiny'));
const port = process.env.PORT || 3000;

const config = {
  user: 'SA',
  password: 'TIMIlehin3151!',
  server: 'localhost', // You can use 'localhost\\instance' to connect to named instance
  database: 'Library'
};

sql.connect(config).catch(err => debug(err));

app.use(express.static(path.join(__dirname, '/public/')));
app.use(
  '/css',
  express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css'))
);

app.use(
  '/js',
  express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js'))
);
app.use(
  '/js',
  express.static(path.join(__dirname, '/node_modules/jquery/dist'))
);
app.set('views', './src/views');
app.set('view engine', 'ejs');
const nav = [
  { link: '/books', title: 'Books' },
  { link: '/authors', title: 'Authors' }
];

const bookRouter = require('./src/routes/bookRoutes')(nav);

app.use('/books', bookRouter);

app.get('/', (req, res) => {
  res.render('index', {
    nav,
    title: 'Library'
  });
});

app.listen(port, () => {
  debug(`Listening on port ${chalk.blue(port)}`);
});
