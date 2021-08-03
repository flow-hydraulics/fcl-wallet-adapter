// TODO: Auth token from app backend in milestone 2

export default function handler(req, res) {
  res.json({
    user: 'dummy user',
    address: 'address',
    etc: {
      meta: "other stuff"
    }
  })
}
