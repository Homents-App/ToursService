const { pool } = require('./database.js');


const getRequests = (id) => {
  return pool
    .query('SELECT * FROM requests INNER JOIN listings ON requests.listing_id = listings.id WHERE requests.listing_id = $1;', [id])
    .then(res => {
      console.log(res.rows);
    })
    .catch((err) => console.error(err.stack));
};





// Inserts user into database if not already there.
const insertRequest = (listingId, request) => {
  user.listing_id = listingId;
  // change to also check listing_id matches before updating
  return User.findOne({ name: user.name, listing_id: user.listing_id })
  .then((existingUser) => {
    if (!existingUser) {
      console.log(`Inserted ${user.name} into the database for property id ${user.listing_id}!`);
      return User.create(user);
    }
    console.log(`Updated ${user.name}'s entry!`);
    return User.findOneAndUpdate({ name: user.name }, user);
  });
}

// Get list of all agents.
const getAgents = (id) => Agent.find({listing_id: id}).exec();

// --------------- Seeding Scripts --------------- //
// const seedUsers = (users) => User.deleteMany({})
//   .then(() => User.insertMany(users))
//   .catch((err) => console.error(err));

// const seedAgents = (agents) => Agent.deleteMany({})
//   .then(() => Agent.insertMany(agents))
//   .catch((err) => console.error(err));

module.exports = {
  getRequests,
  getAgents,
  insertRequest,
  // seedUsers,
  // seedAgents,
};
