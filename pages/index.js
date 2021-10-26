import { useEffect } from 'react'
import { useRouter } from 'next/router'

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
    window.parent?.postMessage({
      type: 'FCL:FRAME:READY',
      log: 'iFrame ready'
    }, target);

    return () => {
      window.removeEventListener('message', handleMessage)
    }
  })

  return (
    <>
      <div>FCL Wallet Adapter { props.walletIP }</div>
    </>
  )
}


// Use this to look up the IP address of
// the `wallet` service at build time
export async function getStaticProps() {
  const dns = require('dns')
  const { promisify } = require('util')

  const lookup = promisify(dns.lookup)
  const { address } = await lookup('wallet')

  return {
    props: {
      walletIP: address
    }
  }
}

export default HomePage
