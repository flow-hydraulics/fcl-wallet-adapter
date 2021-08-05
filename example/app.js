const iframe = document.getElementById('fcl-adapter-frame')

document.getElementById('authn-button').addEventListener('click', () => {
  frame.contentWindow.postMessage({
    type: 'FCL:ADAPTER:AUTHN',
    authToken: 'dummy-token'
  }, 'http://localhost:4000')
})

document.getElementById('authz-button').addEventListener('click', () => {
  frame.contentWindow.postMessage({ type: 'FCL:ADAPTER:AUTHZ' }, 'http://localhost:4000')
})

document.getElementById('loadIframeButton').addEventListener('click', (e) => {
  iframe.src = '//localhost:4000?localhost:4001'
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
