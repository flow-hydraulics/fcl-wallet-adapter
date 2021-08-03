import { useEffect } from 'react'
import { useRouter } from 'next/router'


function HomePage() {
  useEffect(() => {
    const target = 'http://' + window.location.search.substr(1)

    async function handleMessage (msg) {
      switch (msg.data.type) {
        case 'FCL:ADAPTER:AUTHN':
          const resAuthn = await fetch('/api/authn', { method: 'POST' })
          window.parent.postMessage({
            type: 'FCL:ADAPTER:AUTHN:RESPONSE',
            res: (await resAuthn.json())
          }, target)
          break
        case 'FCL:ADAPTER:AUTHZ':
          const resAuthz = await fetch('/api/authz', { method: 'POST' })
          window.parent.postMessage({
            type: 'FCL:ADAPTER:AUTHZ:RESPONSE',
            res: (await resAuthz.json())
          }, target)
          break
        default:
          break
      }
    }

    window.addEventListener('message', handleMessage)
    window.parent.postMessage({ type: 'FCL:FRAME:READY' }, target)

    return () => {
      window.removeEventListener('message', handleMessage)
    }
  })

  return <div>Welcome to Next.js!</div>
}

export default HomePage
