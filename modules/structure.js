const parseStructure = page => {
	return new Promise(resolve => {
		page.evaluate(function () {
			var _structure = document.querySelector('.entry-content')
			var paragraphs = _structure.querySelectorAll('p')
			console.log(paragraphs.innerHTML)
			var stages = []
			for (var i = 1; i < paragraphs.length; i++) {
				var image = paragraphs[i].querySelector('a').innerHTML
				var text = paragraphs[i].innerText
				var obj = {
					text: text,
					image: image
				}
				stages.push(obj)
			}
			return stages
		})
		.then(stages => {
			let reply = []
			try {
				stages.forEach((stage, i) => {
					let image = parseImage(stage.image)
					let steps = parseText(stage.text)
					let title = 'Шаг ' + i
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
	image = image.match(/srcset.{0,150}.jpg/).toString()
	if (image) {
		image = image.match(/http.{0,}\.jpg /).toString()
	}
	if (image) {
		image.trim()
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