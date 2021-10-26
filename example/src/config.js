import { config } from "@onflow/fcl";

config({
  "app.detail.title": "FCL Wallet Adapter Example",
  "accessNode.api": "http://localhost:3000",
  "discovery.wallet": "http://localhost:4000"
  // "accessNode.api": "http://access-testnet.onflow.org",
  // "discovery.wallet": "https://fcl-discovery.onflow.org/testnet/authn"
})
