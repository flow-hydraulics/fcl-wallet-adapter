# FCL Wallet Adapter

**NOTE: This repository is currently not maintained.**


> Wallet authentication and authorization support for your FCL-based applications on Flow.

[![Build and Test](https://github.com/flow-hydraulics/fcl-wallet-adapter/actions/workflows/build-test.yml/badge.svg)](https://github.com/flow-hydraulics/fcl-wallet-adapter/actions/workflows/build-test.yml)
[![Docker Image](https://github.com/flow-hydraulics/fcl-wallet-adapter/actions/workflows/docker.yml/badge.svg)](https://github.com/flow-hydraulics/fcl-wallet-adapter/actions/workflows/docker.yml)
[![Static Analysis](https://github.com/flow-hydraulics/fcl-wallet-adapter/actions/workflows/static-analysis.yml/badge.svg)](https://github.com/flow-hydraulics/fcl-wallet-adapter/actions/workflows/static-analysis.yml)

## Usage

### Development

```
$ make
```

#### Containers

* Example: http://localhost:4001
* Emulator: http://localhost:3569, http://localhost:8080
* FCL Wallet Adapter API: http://localhost:4000
* Wallet API: http://localhost:3000

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓ ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃          FCL Example          ┃ ┃          FCL Adapter          ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛ ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛


                                  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
                                  ┃          Wallet API           ┃
                                  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛


┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                    Flow blockchain (or emulator)                ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```
