// TODO: Auth token from app backend in milestone 2

const fetch = require('node-fetch')

export default async function handler(req, res) {
  const host = process.env.WALLET_HOST || 'localhost'
  const port = process.env.WALLET_PORT || '3000'

  const accountsResponse = await fetch(`http://${host}:${port}/api/accounts`)
  const accounts = await accountsResponse.json()

  res.json(accounts)
}
