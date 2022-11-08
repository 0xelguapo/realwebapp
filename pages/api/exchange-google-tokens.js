const url = require('url')
const { google } = require('googleapis');

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'http://localhost:3000'
)

export default async function handler(req, res) {
  const { tokens } = await oauth2Client.getToken()

}