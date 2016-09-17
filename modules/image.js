const parseImage = page => {
	return new Promise (resolve => {
		page.evaluate(function () {
			var image = document.querySelector('img .alignnone').innerHTML
			console.log(image)
		}).then(image => {

		})
	})
}

module.exports = parseImage