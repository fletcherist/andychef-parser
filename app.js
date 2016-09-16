const phantom = require('phantom')

const parseIngredients = require('./modules/ingredients')
const parseStructure = require('./modules/structure')

// const url = 'http://andychef.ru/recipes/roastedpork'
const url = 'http://localhost:3000/'
const config = ['--load-images=no']
phantom.create(config)
	.then(ph => {
		ph.createPage().then(page => {

			page.on('onConsoleMessage', function(msg) {
				console.log('console: ' + msg)
			})

			page.open(url)
				.then(state => {
					console.log(state)
					Promise.all([
						parseIngredients(page),
						parseStructure(page)
					]).then(res => {
						// console.log(res[0])
						ph.exit()
					})
				})
		})
	})

