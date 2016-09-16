const parseTitle = page => {
	return new Promise (resolve => {
		page.evaluate(function () {
			return document.title
		}).then(title => {
			let parsed = title.match(/(^.{0,}) \- A/)
			if (!parsed) parsed = []
			if (typeof parsed[1] === 'string') {
				// console.log(parsed[1])
			}
			resolve(parsed[1] || '')
		}).catch(e => {
			console.log(e)
		})
	})
	
}

module.exports = parseTitle