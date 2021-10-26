import { useEffect } from 'react'
import { useRouter } from 'next/router'

import {WalletUtils} from "@onflow/fcl"

function HomePage(props) {
  useEffect(() => {
    const target = document.referrer

    async function handleMessage (msg) {
      switch (msg.data.type) {
        case 'FCL:ADAPTER:AUTHN':
          const resAuthn = await fetch('/api/authn', { method: 'POST' })
          window.parent?.postMessage({
            type: 'FCL:ADAPTER:AUTHN:RESPONSE',
            res: (await resAuthn.json())
          }, target)
          break
        case 'FCL:ADAPTER:AUTHZ':
          const resAuthz = await fetch('/api/authz', { method: 'POST' })
          window.parent?.postMessage({
            type: 'FCL:ADAPTER:AUTHZ:RESPONSE',
            res: (await resAuthz.json())
          }, target)
          break
        default:
          break
      }
    }

    window.addEventListener('message', handleMessage);
    WalletUtils.sendMsgToFCL("FCL:VIEW:READY")

    return () => {
      window.removeEventListener('message', handleMessage)
    }
  })

  function closeFrame () {
    WalletUtils.sendMsgToFCL("FCL:FRAME:CLOSE")
  }

  return (
    <>
      <div style={
        {
          background: "white",
          width: "40vw",
          height: "80vh",
          margin: "0 auto"
        }
      }>
        <div>FCL Wallet Adapter { props.wallet.host } { props.wallet.port }</div>
        <button onClick={closeFrame}>Cancel</button>
      </div>
    </>
  )
}


// Use this to look up the IP address of
// the `wallet` service at build time
export async function getStaticProps() {
  console.log(process.env)

  return {
    props: {
      wallet: {
        host: process.env.WALLET_HOST || 'wallet',
        port: process.env.WALLET_PORT || '3000'
      }
    }
  }
}

export default HomePage
