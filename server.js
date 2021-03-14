const mongoose = require('mongoose');
const http = require('http');
const chalk = require('chalk');
const dotenv = require('dotenv');

const socketIo = require('./src/socket/socket.js');
const socketHandler = require('./src/socket/socketHandler');
const router = require('./router');

dotenv.config({ path: 'config/.env' });

const PORT = process.env.PORT || 3000;

const server = http.createServer(router);

socketIo.init(server);

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => {
    server.listen(PORT);
    console.log(`listing on ${PORT}`);
    socketHandler.onConnection();
  })
  .catch((error) => {
    console.error(chalk.bold.red('ERROR:') + error.message);
    process.exit(1);
  });
