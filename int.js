let menuLin = document.getElementById('menuLin')
let menuExp = document.getElementById('menuExp')
let show = document.getElementById('show-button')
let hide = document.getElementById('hide-button')
let help = document.getElementById('help')
let helpMenu = document.getElementById('helpMenu')

hide.addEventListener('click', ev => {
	menuLin.classList.add('hide')
	menuExp.classList.add('hide')
	hide.classList.add('hide')
	show.classList.remove('hide')
})

show.addEventListener('click', ev => {
	menuLin.classList.remove('hide')
	menuExp.classList.remove('hide')
	hide.classList.remove('hide')
	show.classList.add('hide')
})

helpMenu.addEventListener('click', ev => {
	ev.preventDefault()
	helpMenu.classList.toggle('hide')
})

help.addEventListener('click', ev => {
	ev.preventDefault()
	helpMenu.classList.toggle('hide')
})
