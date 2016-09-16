const parseStructure = page => {
	return new Promise(resolve => {
		page.evaluate(function () {
			var _structure = document.querySelector('.entry-content')
			var paragraphs = _structure.querySelectorAll('p')
			for (var i = 0; i < paragraphs.length; i++) {
				var image = paragraphs[i].querySelector('a').innerHTML
				image = image.match(/srcset.{0,150}.jpg/).toString()
				if (image) {
					image = image.match(/http.{0,}\.jpg /).toString()
				}
				if (image) {
					image.trim()
				}
				
				console.log(image)
			}
			return _structure
		})
		.then(res => {
			// console.log(res)
			resolve(res)
		})
	})
}

module.exports = parseStructure