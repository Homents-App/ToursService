const { User, Agent } = require('./database.js');

// Gets list of all users.
const getUsers = () => User.find();

const getRequests = () => User.find({}, 'date time').exec();

// Inserts user into database if not already there.
const insertUser = (listingId, user) => {
  user.listing_id = listingId;
  // change to also check listing_id matches before updating
  return User.findOne({ name: user.name })
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
const getAgents = () => Agent.find().exec();

// --------------- Seeding Scripts --------------- //
const seedUsers = (users) => User.deleteMany({})
  .then(() => User.insertMany(users))
  .catch((err) => console.error(err));

const seedAgents = (agents) => Agent.deleteMany({})
  .then(() => Agent.insertMany(agents))
  .catch((err) => console.error(err));

module.exports = {
  getUsers,
  getRequests,
  getAgents,
  insertUser,
  seedUsers,
  seedAgents,
};
