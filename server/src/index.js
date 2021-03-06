
const path    = require('path')
const request = require('request')
const express = require('express')
const app     = express()
const server  = require('http').Server(app).listen(8000)
const io      = require('socket.io')(server)

// const child_process = require('child_process')

// const fs      = require('fs')

//app.use('/wall', express.static('www/wall'))
app.use('/client', express.static('www/client'))

app.use('/wall', (req, res, next) => {
	// if (req.url !== "/build/index.js") {
	// 	return express.static('www/wall')(req, res, next)
	// }
	
	var webpackDevServerHost = 'http://localhost:8080/www/wall'
	req.pipe(request(webpackDevServerHost + req.url)).pipe(res)
})
	
io.sockets.on('connection', socket => {
	console.log('socket connected...')
	socket.on('disconnect', () => {
		console.log('...socket disconnected')
	})
	// socket.on('stream.client', data => {
	// 	console.log('stream', new Date())
	// 	socket.broadcast.emit('stream.client', data)
	// 	// write to the disk
	// 	// fs.writeFile('./learn/client.jpg',
	// 	// 	data.replace(/^data:image\/jpeg;base64,/, ""), 
	// 	// 	'base64', console.log)
	// })
	// socket.on('stream.wall', data => {
	// 	// console.log('stream', new Date())
	// 	// socket.broadcast.emit('stream', data)
	// 	// write to the disk
	// 	// fs.writeFile('./learn/wall.jpg', 
	// 	// 	data.replace(/^data:image\/jpeg;base64,/, ""), 
	// 	// 	'base64', console.log)
	// })
	socket.on('pointer', data => {
		// console.log('[pointer]', data)
		socket.broadcast.emit('pointer', data)
	})
})
