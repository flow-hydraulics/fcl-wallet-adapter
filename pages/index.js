import { useEffect } from 'react'
import { useRouter } from 'next/router'

import {WalletUtils} from "@onflow/fcl"

function readyCallback(data) {
  console.log(data)

  if (typeof data != "object") return
  if (data.type !== "FCL:VIEW:READY:RESPONSE") return

  fetch("http://localhost:4000/api/authn")
    .then(res => res.json())
    .then(accounts => {
      if(accounts.length === 0 || !accounts[0].address) {
        throw new Error("No accounts found")
      }

      console.log(accounts[0].address)

      WalletUtils.approve({
        f_type: "AuthnResponse",
        f_vsn: "1.0.0",
        addr: accounts[0].address,
        services: [
          {
            f_type: "Service",
            f_vsn: "1.0.0",
            type: "authn",
            method: "DATA",
            uid: "flow-wallet-api#authn",
            endpoint: "http://localhost:4001/api/authn",
            id: accounts[0].address,
            identity: {
              f_type: "Identity",
              f_vsn: "1.0.0",
              address: accounts[0].address,
              keyId: 0
            },
            provider: {
              f_type: "ServiceProvider",
              f_vsn: "1.0.0",
              address: accounts[0].address
              // name: "Amazing Wallet",         // OPTIONAL - The name of your wallet. ie: "Dapper Wallet" or "Blocto Wallet"
              // description: "The best wallet", // OPTIONAL - A short description for your wallet
              // icon: "https://___",            // OPTIONAL - Image url for your wallets icon
              // website: "https://___",         // OPTIONAL - Your wallets website
              // supportUrl: "https://___",      // OPTIONAL - An url the user can use to get support from you
              // supportEmail: "help@aw.com",    // OPTIONAL - An email the user can use to get support from you
            }
          }
        ]
      })
    })
    .catch(err => {
      WalletUtils.decline(err.message)
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
