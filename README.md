# tours

## About The Project
A student recreation of a Trulia page. Tour request module. Visit http://34.229.154.23:3001/ to take a look at the isolated module!

## Table of Contents

* [About the Project](#about-the-project)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [License](#license)
* [Contact](#contact)

## Getting Started
Please note that client-side tests are NOT current - they require CSS mocks before they will function again.

### Prerequisites
* npm

### Usage
Clone repo
git clone https://github.com/HRR49HouseStark/tours.git
Install packages
npm install
Install mongoDB Consult the awsNotes.txt file for information on how to do this on Linux distributions.

Run seeding script

npm run seed
This populates a small table of agents and a large table of user tour requests.

### Development
For a server which automatically reloads on bundle compilation AND server changes:

Run npm run devBuild in one terminal
Separately run npm run devStart in another terminal

### Production
Run npm run production to automatically compile latest changes, then run the app.

### Installation
1. Clone repo
```sh
git clone https://github.com/HRR49HouseStark/tours.git
```

2. Install packages
```sh
npm install
```

## License

Distributed under MIT License. See `LICENSE` for more information.

## Contact
Michael Chen - mikatpt@gmail.com
