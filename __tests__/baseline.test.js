describe('IFRAME tests', () => {
  beforeAll(async () => {

    // Define a window.onCustomEvent function on the page.
    // await page.exposeFunction('onCustomEvent', (e) => {
    //   console.log(`${e.type} fired`, e.detail || '')
    // })

    // function listenFor(type) {
    //   return page.evaluateOnNewDocument((type) => {
    //     document.addEventListener(type, (e) => {
    //       window.onCustomEvent({ type, detail: e.detail })
    //     })
    //   }, type)
    // }

    // await listenFor('message')

    await page.goto('http://localhost:4001', {
    })
  })

  it('has the right title', async () => {
    await expect(page.title()).resolves.toMatch('FCL Wallet Adapter: Example')
  })

  it('gets FCL:FRAME:READY event', async () => {
    const loadIframeButton = await page.$('#loadIframeButton')
    const iframe = await page.$('iframe')

    const srcStart = await page.evaluate('document.querySelector("iframe").getAttribute("src")')
    expect(srcStart).toBe(null)

    await expect(page).toClick('#loadIframeButton', { text: 'Load iframe' })

    const srcEnd = await page.evaluate('document.querySelector("iframe").getAttribute("src")')
    expect(srcEnd).toBe('//localhost:4000?localhost:4001')
  })
})
