const parseIngredients = page => {
	return new Promise (resolve => {
		page.evaluate(function () {
			var _list = document.querySelector('.ox_list_animated').innerText
			return _list
		})
		.then(res => {
			let ingredients = formatIngredients(res)
			console.log(ingredients)
			resolve(ingredients)
		})
		.catch(e => {throw new Error()})
	})
}

const formatIngredients = inp => {
	if (!inp) return false
	var formatted = inp.split('\n')
	var ingredients = []
	try {
		formatted.map(item => {
			let formatItem = item.split('—')
			let name, value
			if (formatItem[0] && formatItem[1]) {
				name = formatItem[0].trim()
				value = formatItem[1].trim()
			}
			if (!name || !value) return false
			var amount, measure
			var formatValue = value.split(' ')
			amount = parseInt(formatValue[0])
			measure = formatValue[1]
			if (name && amount && measure) {
				ingredients.push({
					product: name,
					amount: amount,
					measure: measure,
					isMain: true,
					extra: false
				})
			} else {
				console.log('[error]:while parsing ingredient')
			}
		})
	} catch (e) {
		console.log(e)
	}
	return ingredients
}

module.exports = parseIngredients