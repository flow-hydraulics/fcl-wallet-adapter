const frame = document.getElementById('fcl-adapter-frame')
console.log(frame)

document.getElementById('authn-button').addEventListener('click', () => {
  frame.contentWindow.postMessage({
    type: 'FCL:ADAPTER:AUTHN',
    authToken: 'dummy-token'
  }, 'http://localhost:4000')
})

document.getElementById('authz-button').addEventListener('click', () => {
  frame.contentWindow.postMessage({ type: 'FCL:ADAPTER:AUTHZ' }, 'http://localhost:4000')
})

window.addEventListener('message', (message) => {
  switch (message.data?.type) {
    case 'FCL:FRAME:READY':
      console.log('ready!')
      break
    case 'FCL:ADAPTER:AUTHN:RESPONSE':
      console.log(message.data)
      break
    case 'FCL:ADAPTER:AUTHZ:RESPONSE':
      console.log(message.data)
      break
    default:
      break
  }
}, false)
