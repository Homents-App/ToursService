const { pool } = require('./database.js');


const getRequests = (id) => {
  return pool
    .query('SELECT * FROM requests INNER JOIN listings ON requests.listing_id = listings.id WHERE requests.listing_id = $1;', [id])
    .then(res => {
      console.log(res.rows);
    })
    .catch((err) => console.error(err.stack));
};

const getAgents = (id) => {
  return pool
  .query('SELECT * FROM agents INNER JOIN listings ON (agents.id = listings.agent1 OR Agents.id = listings.agent2 OR Agents.id = listings.agent3 OR Agents.id = listings.agent4) WHERE listings.id = $1;', [id])
  .then(res => {
    console.log(res.rows);
  })
  .catch((err) => console.error(err.stack));
};

// Inserts request for a certain listing id and email into database if not already there.
const insertRequest = (listingId, request) => {
  request.listing_id = Number(listingId);
  console.log('request to insert: ', request);

  return pool
    .query('SELECT * FROM requests WHERE requests.email = $1 AND requests.listing_id = $2', [request.email, listingId])
    .then((results) => {
      console.log('query results: ', results.rows);
      if (results.rows.length === 0) {
        return pool
          .query('INSERT INTO requests (name, number, email, type, date, time, call, listing_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);', [request.name, request.number, request.email, request.type, request.date, request.time, request.call, request.listing_id])
          .then((res) => {
            console.log(`Inserted tour request for ${request.email} into the database for property id ${request.listing_id}!: `, res.rows);
          })
          .catch((err) => console.error('error inserting', err.stack));
      } else {
        console.log('Request for email and listing already present; use update method instead');
        return results;
      }
  });
};

// FUTURE OPTIMIZATION: USING ON CONFLICT DO UPDATE
// return pool
// .query('INSERT INTO requests (name, number, email, type, date, time, call, listing_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) ON CONFLICT requests.email DO UPDATE SET name=$1, number=$2, type=$4, date=$5, time=$6, call=$7;', [request.name, request.number, request.email, request.type, request.date, request.time, request.call, request.listing_id])
// .then((res) => {
//   console.log(`Inserted tour request for ${request.email} into the database for property id ${request.listing_id}!: `, res.rows);
// })
// .catch((err) => console.error('error inserting', err.stack));

const updateRequest = (id, request) => {
  return pool
    .query('UPDATE requests SET name=$1, number=$2, type=$4, date=$5, time=$6, call=$7 WHERE listing_id=$8 AND email=$3;', [request.name, request.number, request.email, request.type, request.date, request.time, request.call, id])
    .then(res => {
      console.log(res.rows);
    })
    .catch((err) => console.error(err.stack));
};

const deleteRequest = (id, userEmail) => {
  return pool
    .query('DELETE FROM requests WHERE email=$1 AND listing_id=$2;', [userEmail, id])
    .then(res => {
      console.log(res.rows);
    })
    .catch((err) => console.error(err.stack));
};


module.exports = {
  getRequests,
  getAgents,
  insertRequest,
  updateRequest,
  deleteRequest
};
