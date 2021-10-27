import { useEffect } from 'react'
import { useRouter } from 'next/router'

import {WalletUtils} from "@onflow/fcl"

function readyCallback(data) {
  console.log(data)

  if (typeof data != "object") return
  if (typeof data.type !== "FCL:VIEW:READY:RESPONSE") return

  // Do authentication things
  // Show address field if it's an authn request?

  // Send back AuthnResponse
  WalletUtils.sendMsgToFCL("FCL:VIEW:RESPONSE", {
    f_type: "PollingResponse",
    f_vsn: "1.0.0",
    status: "APPROVED",
    // addr: "0xUSER"
    data: {
      f_type: "AuthnResponse",
      f_vsn: "1.0.0"
      // ...
    }
  })

  // The same AuthnResponse can alternatively be sent using WalletUtils.approve (or WalletUtils.decline)
  WalletUtils.approve({
    f_type: "AuthnResponse",
    f_vsn: "1.0.0"
    // ...
  })
}

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

    WalletUtils.onMessageFromFCL("FCL:VIEW:READY:RESPONSE", readyCallback)
    WalletUtils.sendMsgToFCL("FCL:VIEW:READY")

    return () => {
      WalletUtils.onMessageFromFCL("FCL:VIEW:READY:RESPONSE", () => {})
    }
  })

  function closeFrame () {
    WalletUtils.sendMsgToFCL("FCL:VIEW:CLOSE")
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
        host: process.env.WALLET_HOST || 'localhost',
        port: process.env.WALLET_PORT || '3000'
      }
    }
  }
}

export default HomePage
