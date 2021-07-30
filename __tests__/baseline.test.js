describe('Baseline', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:4001');
  });

  it('should be titled "FCL Wallet Adapter: Example"', async () => {
    await expect(page.title()).resolves.toMatch('FCL Wallet Adapter: Example');
  });
});
