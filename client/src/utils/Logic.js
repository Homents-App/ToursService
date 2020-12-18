import axios from 'axios';

// ---------------------------- API CALLS ---------------------------- //

export const getData = (setRequests, setAgents, id) => axios.get(`/api/tours/${id}/requests`)
  .then((response) => {
    setRequests(response.data);
    return axios.get(`/api/tours/${id}/agents`);
  })
  .then((response) => {
    setAgents(response.data);
  })
  .catch((err) => console.log(err));

export const submitForm = (id, toSend) => axios.post(`/api/tours/${id}/requests`, toSend)
  .then(() => console.log(`Sent ${toSend.name}'s request to the database!`))
  .catch((err) => console.log(err));

// ---------------------------- GENERAL UTILS ---------------------------- //

// Check for occupied slots. Return all EXCEPT those slots.
export const getFreeSlots = (occupied = [], currentDate = '') => {
  const occupiedSlots = {};
  const result = [];

  occupied.forEach((person) => {
    person.date === currentDate ? occupiedSlots[person.time] = true : null;
  });

  for (let i = 9; i < 20; i += 1) {
    const ampm = i > 11 ? 'PM' : 'AM';
    const hour = i % 12 === 0 ? 12 : i % 12;

    const time = `${hour}:00 ${ampm}`;
    const time2 = `${hour}:30 ${ampm}`;

    if (occupiedSlots[time]) { result.push(time); }
    if (occupiedSlots[time2]) { result.push(time2); }
  }
  if (result[result.length - 1] === '7:30 PM') { result.pop(); }
  return result;
};

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Recursively gets and formats next seven days.
export const getDays = (date = new Date(), result = []) => {
  if (result.length === 7) { return result; }

  const month = date.getMonth() + 1;
  const currentDate = date.getDate();
  const year = date.getFullYear();

  const dateObj = {
    name: days[date.getDay()],
    month: months[date.getMonth()],
    day: currentDate,
    date: `${month}/${currentDate}/${year}`,
  };
  result.push(dateObj);
  const tomorrow = new Date(date.getTime() + (24 * 60 * 60 * 1000));

  return getDays(tomorrow, result);
};

// eslint-disable-next-line no-useless-escape
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const phoneRegex = /^\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$/;

// Verifies if a given field is a valid entry.
export const validate = (name, form, setError) => {
  setError((state) => {
    const a = state;
    if (name === 'name') {
      a.name = form.name.length === 0;
    } else if (name === 'number') {
      a.number = !phoneRegex.test(form.number);
    } else if (name === 'email') {
      a.email = !emailRegex.test(form.email);
    }
    return ({ ...a });
  });
};
