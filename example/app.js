function postMessageToIFrame (e) {
  const frame = document.getElementById('fcl-adapter-frame')
  frame.contentWindow.postMessage({ message: 'hi' }, '*', [])
}

document.getElementById('postMessageButton').addEventListener('click', postMessageToIFrame)
