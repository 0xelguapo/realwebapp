const url = require('url')
const { google } = require('googleapis');

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'http://localhost:3000'
)

google.options({ auth: oauth2Client })

export default async function handler(req, res) {
  const { tokens } = await oauth2Client.getToken('4/0AfgeXvvlG0ozex_0veZBikz9ngUYHPJry7eOFpQVWIKySpY9SeagPdnrp5ZnefMD_5qkyA')
  console.log(tokens)
  


}