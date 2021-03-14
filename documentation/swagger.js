const swaggerAutogen = require('swagger-autogen')();

const outputFile = './documentation/swagger_output.json';
const endpointsFiles = ['./router.js'];
const doc = {
  definitions: {
    addRoom: {
      room: {
        participants: ['<userID>', '<userID>'],
      },
    },
  },
  securityDefinitions: {
    apiKeyAuth: {
      type: 'apiKey',
      in: 'header', // can be "header", "query" or "cookie"
      name: 'Authorization', // name of the header, query parameter or cookie
      description: 'any description...',
    },
  },
};

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require('../server.js');
});
