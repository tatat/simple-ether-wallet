# Simple Ether Wallet (Nuxt.js)

Ref: https://book.ethereum-jp.net/meteor_dapp/

## Run Geth

```
geth --datadir $YOUR_DATADIR --networkid 15 --rpc --rpcaddr 0.0.0.0 --rpcport 8545 --rpccorsdomain "*" --ws --wsaddr 0.0.0.0 --wsport 8546 --wsorigins '*' console 2>>geth.log
```

## Build Setup

``` bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn run dev

# build for production and launch server
$ yarn run build
$ yarn start

# generate static project
$ yarn run generate
```