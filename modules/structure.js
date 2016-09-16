const parseStructure = page => {
	return new Promise(resolve => {
		page.evaluate(function () {
			var _structure = document.querySelector('.entry-content')
			var paragraphs = _structure.querySelectorAll('p')

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
			try {
				stages.forEach(stage => {
					let image = parseImage(stage.image)
					let text = parseText(stage.text)
					// console.log(image)
				})
			} catch (e) {
				console.log(e)
			}
			resolve(res)
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
	let stage = text.split('\n')
	for (steps of stage) {
		console.log(steps.split('. '))
	}

}



module.exports = parseStructure