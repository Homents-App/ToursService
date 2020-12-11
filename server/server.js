require('newrelic');
const app = require('./app.js');

const port = 3001;

app.listen(port, () => console.log(`Tours module is listening at http://localhost:${port}`));
