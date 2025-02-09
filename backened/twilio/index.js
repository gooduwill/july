require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;


// Initialize the Twilio client
const client = require('twilio')(accountSid, authToken);

// Send an SMS message
client.messages
  .create({
    body: 'You have an appointment with Owl, Inc. on Friday, November 3 at 4:00 PM. Reply C to confirm.',  // Message text
    messagingServiceSid: 'AC0cb1e9e72935395a8b9b03d2f64c7012', // Messaging service SID
    to: '+917267800980' // Recipient's phone number
  })
  .then(message => console.log(message.sid));