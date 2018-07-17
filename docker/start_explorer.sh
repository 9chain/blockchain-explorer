#!/bin/sh

workdir=/blockchain-explorer
cd $workdir
rm -rf /tmp/fabric-client-kvs_peerOrg*
mkdir -p ./logs/app & mkdir -p ./logs/db & mkdir -p ./logs/console
node main.js


