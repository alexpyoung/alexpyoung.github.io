function onSelectImage() {
	const src = event.target.getAttribute('src')
	const img = document.querySelector('.hero img')
	img.setAttribute('src', src)
}
