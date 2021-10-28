import { config } from "@onflow/fcl";

config({
  "app.detail.title": "FCL Wallet Adapter Example",
  "accessNode.api": "http://localhost:8080",
  "discovery.wallet": "http://localhost:4000",
  "discovery.wallet.method": "IFRAME/RPC",
  "service.OpenID.scopes": "email!",
  "0xProfile": "0x01cf0e2f2f715450"
  // "accessNode.api": "http://access-testnet.onflow.org",
  // "discovery.wallet": "https://fcl-discovery.onflow.org/testnet/authn"
})
