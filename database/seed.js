const faker = require('faker');

// This file creates uses faker to create 100 fake users and 5 fake agents.

const createFakeUsers = (agents) => {
  const users = [];
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

  for (let i = 0; i < 100; i += 1) {
    const date = new Date(faker.date.between(range[0], range[1]));
    const hour = date.getHours() % 12;
    const minutes = ['00', '30'][Math.floor(Math.random() * 2)];
    const ampm = date.getHours() > 11 ? 'PM' : 'AM';

    const fakeUser = {
      name: faker.name.findName(),
      number: faker.phone.phoneNumber(),
      email: faker.internet.email(),
      type: types[Math.floor(Math.random() * 2)],
      date: date.toLocaleDateString(),
      time: `${hour}:${minutes} ${ampm}`,
      call: calls[Math.floor(Math.random() * 2)],
      agent: agents[Math.floor(Math.random() * agents.length)].name,
      listing_id: Math.floor(Math.random * 1000000);
    };
    users.push(fakeUser);
  }
  return users;
};

const getPhotoURL = () => {
  const gender = ['men', 'women'][Math.floor(Math.random() * 2)];
  const number = Math.floor(Math.random() * 100);
  return `https://randomuser.me/api/portraits/${gender}/${number}.jpg`;
};

const createFakeAgents = () => {
  const agents = [];
  const titles = ['Listing', 'Premier'];
  for (let i = 0; i < 4; i += 1) {
    const fakeAgent = {
      name: faker.name.findName(),
      title: titles[Math.floor(Math.random() * titles.length)],
      number: faker.phone.phoneNumber(),
      stars: Math.floor((Math.random() * 5) + 1),
      reviews: Math.floor((Math.random() * 100) + 1),
      sales: Math.floor((Math.random() * 100) + 1),
      // photo: faker.image.avatar(),
      photo: getPhotoURL(),
    };
    agents.push(fakeAgent);
  }
  return agents;
};

module.exports = {
  createFakeAgents,
  createFakeUsers,
};
