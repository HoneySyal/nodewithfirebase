const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();


const authRoute = require('./routers/authRoute');

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)

// });

app.use(express.json());
const port = process.env.PORT;

app.use('/auth', authRoute);

app.listen(port, () => {
  console.log('Server is running http://localhost:' + port + '/');
});