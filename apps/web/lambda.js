const awsServerlessExpress = require('@vendia/serverless-express')
const express = require('express')
const next = require('next')

const app = next({ dev: false, conf: { distDir: '.next' } })
const handle = app.getRequestHandler()

const server = express()

server.all('*', (req, res) => handle(req, res))

const lambdaServer = awsServerlessExpress.createServer(server)

exports.handler = (event, context) =>
  awsServerlessExpress.proxy(lambdaServer, event, context)
