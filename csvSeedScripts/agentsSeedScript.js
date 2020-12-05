const faker = require('faker');
const fs = require('fs');

// This file uses faker to create 10,000 agents.
// schema: id, name, title, number, stars, reviews, sales, photo

const agents = '../agentsData.csv';

try {
  if (fs.existsSync(agents)) {
    fs.unlinkSync(agents);
    console.log('agents file deleted');
  }
} catch(err) {
  console.error(err);
}

const server = require('http').createServer();

server.on('request', (req, res) => {
  const src = fs.createReadStream(agents);
  src.pipe(res);
});

server.listen(8000);

const getPhotoURL = () => {
  const gender = ['men', 'women'][Math.floor(Math.random() * 2)];
  const number = Math.floor(Math.random() * 100);
  return `https://randomuser.me/api/portraits/${gender}/${number}.jpg`;
};
const titles = ['Listing', 'Premier'];

const createFakeAgent = (index) => {
  return '' +
    index + ',' +
    faker.name.findName() + ',' +
    titles[Math.floor(Math.random() * titles.length)] + ',' +
    faker.phone.phoneNumber() + ',' +
    Math.floor((Math.random() * 5) + 1) + ',' +
    Math.floor((Math.random() * 100) + 1) + ',' +
    Math.floor((Math.random() * 100) + 1) + ',' +
    getPhotoURL() + '\n';
};

const file = fs.createWriteStream(agents);

file.write('id, name, title, number, stars, reviews, sales, photo\n')

for (var i = 1; i <= 10000; i++) {
  if (i === 1) {
    console.log('agent write started');
  } else if (i === 10000) {
    console.log('agent write complete!');
  } else if (i % 1000 === 0) {
    console.log('agent #' + i + ' created');
  }
  file.write(createFakeAgent(i));
}

file.end();