// Backend (Node.js example using Express)

const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/exchange-token', async (req, res) => {
  const { accessToken } = req.body;

  // Send a request to Google's token endpoint to exchange the access token for a JWT
  const response = await fetch('https://www.googleapis.com/oauth2/v4/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `client_id=YOUR_CLIENT_ID&client_secret=YOUR_CLIENT_SECRET&grant_type=authorization_code&code=${accessToken}&redirect_uri=YOUR_REDIRECT_URI`,
  });

  const tokenData = await response.json();
  const { id_token } = tokenData;

  // Verify the JWT (optional but recommended)
  const decodedToken = jwt.decode(id_token);
  // Perform additional validation if needed

  // Return the JWT to the frontend
  res.json({ jwtToken: id_token });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
