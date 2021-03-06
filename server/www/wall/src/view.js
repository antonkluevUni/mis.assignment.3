
import rects from './model'
import {e} from './index.js'
import {vec} from 'fw'

export let cv = document.querySelector('#canvas')
export let ct = cv.getContext('2d')

let p = 40
export let marks;

window.addEventListener('load', () => {
	cv.width  = window.innerWidth
	cv.height = window.innerHeight - 2
	rects.forEach(rect => {
		rect.img        = new Image()
		rect.img.onload = draw
		rect.img.src    = rect.src
	})
	marks = {
		lt : new vec(p, p), 
		rt : new vec(cv.width - p, p),
		lb : new vec(p, cv.height - p),
		rb : new vec(cv.width - p, cv.height - p)
	}
})

export let draw = pointer => {
	// ct.clearRect(0, 0, cv.width, cv.height)
	ct.fillStyle = 'white'
	ct.fillRect(0, 0, cv.width, cv.height)
	// draw content
	rects.concat().sort((a, b) => a.z - b.z).forEach(rect => {
		ct.save()
		roundedImage(rect.x, rect.y, rect.w, rect.h, 10)
		ct.shadowBlur    = 30
		ct.shadowOffsetX = 0
		ct.shadowOffsetY = 10
		ct.shadowColor   = 'rgba(0,0,0,.4)'
		ct.fillStyle     = 'white'
		ct.fill()
		ct.clip()
		ct.drawImage(rect.img, rect.x, rect.y, rect.w, rect.h)
		ct.restore()
	})
	// draw tracking marks
	for (let a in marks) {
		ct.fillStyle = `rgb(255,0,255)`
		ct.beginPath()
		ct.arc(marks[a].x, marks[a].y, p-10, 0, 2 * Math.PI)
		ct.fill()
	}
	// draw cursor
	if (pointer) {
		ct.beginPath()
		ct.arc(pointer.x, pointer.y, 30, 0, 2 * Math.PI)
		ct.fillStyle = 'hsla(205, 100%, 50%, .5)'
		ct.fill()
	}
}

let roundedImage = (x, y, w, h, r) => {
	ct.beginPath()
	ct.moveTo(x+r, y)
	ct.lineTo(x+w-r, y)
	ct.quadraticCurveTo(x+w, y, x+w, y+r)
	ct.lineTo(x+w, y+h-r)
	ct.quadraticCurveTo(x+w, y+h, x+w-r, y+h)
	ct.lineTo(x+r, y+h)
	ct.quadraticCurveTo(x, y+h, x, y+h-r)
	ct.lineTo(x, y+r)
	ct.quadraticCurveTo(x, y, x+r, y)
	ct.closePath()
}
