const parseStructure = page => {
	return new Promise(resolve => {
		page.evaluate(function () {
			var _structure = document.querySelector('.entry-content')
			var paragraphs = _structure.querySelectorAll('p')
			var stages = []
			for (var i = 1; i < paragraphs.length; i++) {
				if (paragraphs[i]) {
					var image = paragraphs[i].querySelector('a')
					var text = paragraphs[i].innerText
					if (image) {
						image = image.innerHTML
					}
					stages.push({
						text: text,
						image: image
					})
				}
			}
			return stages
		})
		.then(stages => {
			let reply = []
			try {

				stages.forEach((stage, i) => {
					let image = parseImage(stage.image)
					let steps = parseText(stage.text)
					let num = i + 1
					let title = ''
					// push a stage into stages
					reply.push({
						title: title,
						image: image,
						steps: steps
					}) 
					// console.log(image)
				})

			} catch (e) {
				console.log(e)
			}
			resolve(reply)
		})
	})
}

const parseImage = image => {
	if (!image) return ''
	image = image.match(/srcset.{0,150}.jpg/)
	if (image) {
		image = image.toString().match(/http.{0,}\.jpg /)
	}
	if (image) {
		image.toString().trim()
	}
	return image
}

const parseText = text => {
	if (!text) return ''
	let _stage = text.split('\n')
	let stages = []
	let reply = []
	for (_steps of _stage) {
		const steps = _steps.split('. ')
		
		for (step of steps) {
			reply.push({title: step})
		}
	}

	// actually steps
	return reply
}



module.exports = parseStructure