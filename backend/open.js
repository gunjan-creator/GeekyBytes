const open = require('open');

setTimeout(() => {
  open('http://localhost:3000');
}, 1500); // Delay to make sure the server starts first
