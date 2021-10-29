import Cors from 'cors'

function initMiddleware(middleware) {
  return (req, res) =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result)
        }
        return resolve(result)
      })
    })
}

const cors = initMiddleware(Cors())

export default async function handler(req, res) {
  const host = process.env.WALLET_HOST || 'localhost'
  const port = process.env.WALLET_PORT || '3000'

  await cors(req, res)

  console.log(req.body)

  const { payer, cadence } = req.body.voucher
  const signResponse = await fetch(`http://wallet:${port}/api/accounts/${payer}/sign`, {
    method: 'post',
    body: JSON.stringify({
      code: cadence,
      arguments: req.body.voucher.arguments
    }),
    headers: {'Content-Type': 'application/json'}
  })
  const signed = await signResponse.json()

  // console.log(signed)

  const response = {
    f_type: "PollingResponse",
    f_vsn: "1.0.0",
    status: "APPROVED",
    data: {
      f_type: "CompositeSignature",
      f_vsn: "1.0.0",
      addr: `0x${signed.payer}`,
      keyId: signed.proposalKey.keyIndex,
      signature: signed.payloadSignatures[0].signature
    }
  }

  // console.log(response)
  res.json(response)
}
