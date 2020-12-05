const faker = require('faker');
const fs = require('fs');

// This file uses faker to create 50,000,000 tour requests.
// schema: id, name, number, email, type, date, time, call, listing_id

const requests = '../requestsData.csv';

if (fs.existsSync(requests)) {
  try {
    fs.unlinkSync(requests);
    console.log('requests file deleted');
  } catch(err) {
    console.error(err);
  }
}

const server = require('http').createServer();

server.on('request', (req, res) => {
  const src = fs.createReadStream(requests);
  src.pipe(res);
});

server.listen(8002);

const types = ['in-person', 'video'];
const calls = [true, false];

const today = new Date();
const next = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

const range = [today, next].map((date) => {
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();
  return `${year}-${month}-${day}`;
});


const createFakeRequest = (index) => {

  const date = new Date(faker.date.between(range[0], range[1]));
  const hour = date.getHours() % 12;
  const minutes = ['00', '30'][Math.floor(Math.random() * 2)];
  const ampm = date.getHours() > 11 ? 'PM' : 'AM';

  return '' +
    index + ',' +
    faker.name.findName() + ',' +
    faker.phone.phoneNumber() + ',' +
    faker.internet.email() + ',' +
    types[Math.floor(Math.random() * 2)] + ',' +
    date.toLocaleDateString() + ',' +
    `${hour}:${minutes} ${ampm}` + ',' +
    calls[Math.floor(Math.random() * 2)] + ',' +
    (Math.floor(Math.random() * 1e7) + 1) + '\n';
};

const file = fs.createWriteStream(requests);

file.write('id, name, number, email, type, date, time, call, listing_id\n');

let q = 0;

const writer = () => {
  let ok = true;

  while (q < 2e7 && ok) {
    q++;
    if (q === 1) {
      console.log('request write started');
    } else if (q === 2e7) {
      console.log('request write 1 complete!');
    } else if (q % 1e6 === 0) {
      console.log('request #' + q + ' created');
    }
    ok = file.write(createFakeRequest(q));
  }
  if (q < 2e7) {
    file.once('drain', writer);
  }
};
writer();