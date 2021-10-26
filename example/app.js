const iframe = document.getElementById('fcl-adapter-frame')
const log = document.getElementById('logs')

document.getElementById('authn-button').addEventListener('click', () => {
  frame.contentWindow.postMessage({
    type: 'FCL:ADAPTER:AUTHN',
    authToken: 'dummy-token'
  }, 'http://localhost:3000')
})

document.getElementById('authz-button').addEventListener('click', () => {
  frame.contentWindow.postMessage({ type: 'FCL:ADAPTER:AUTHZ' }, 'http://localhost:3000')
})

window.addEventListener('message', (message) => {
  console.log(message)

  const { type, log } = message.data

  switch (message.data?.type) {
    case 'FCL:ADAPTER:AUTHN:RESPONSE':
      console.log(message.data)
      break
    case 'FCL:ADAPTER:AUTHZ:RESPONSE':
      console.log(message.data)
      break
    default:
      break
  }

  if (log) {
    logs.innerHTML += `[${type}]: ${log}`
    logs.innerHTML += "\n\n"
  }
}, false)
