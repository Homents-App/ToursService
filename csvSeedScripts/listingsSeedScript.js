const faker = require('faker');
const fs = require('fs');

// This file uses faker to create 10,000,000 listings.
// schema: id, agent1, agent2, agent3, agent4

const listings = '../listingsData.csv';

try {
  if (fs.existsSync(listings)) {
    fs.unlinkSync(listings);
    console.log('listings file deleted');
  }
} catch(err) {
  console.error(err);
}

const server = require('http').createServer();

server.on('request', (req, res) => {
  const src = fs.createReadStream(listings);
  src.pipe(res);
});

server.listen(8001);



const createFakeListing = () => {

  let agents = [];
  let random = 0;

  const randomFinder = function (limit) {
    return Math.floor((Math.random() * limit) + 1);
  }

  for (var i = 0; i < 4; i++) {
    random = randomFinder(1e4);
    // ensures 4 unique agents per listing only
    while (agents.includes(random)) {
      random = randomFinder(1e4);
    }
    agents.push(random);
  }

  return '' +
    agents[0] + ',' +
    agents[1] + ',' +
    agents[2] + ',' +
    agents[3] + '\n';
};

const file = fs.createWriteStream(listings);

file.write('agent1, agent2, agent3, agent4\n');

for (var i = 1; i <= 1e7; i++) {
  if (i === 1) {
    console.log('listing write started');
  } else if (i === 1e7) {
    console.log('listing write complete!');
  } else if (i % 1e6 === 0) {
    console.log('listing #' + i + ' created');
  }
  file.write(createFakeListing());
}

file.end();