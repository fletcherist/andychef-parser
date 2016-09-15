const phantom = require('phantom')

const url = 'http://andychef.ru/recipes/bananabread/'
phantom.create()
	.then(ph => {
		ph.createPage().then(page => {
			page.open(url)
				.then(state => {
					page.evaluate(function () {
						return document.title
					})
					.then(title => console.log(title))
				})
		})
	})
console.log(phantom)