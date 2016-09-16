const phantom = require('phantom')
const fs = require('fs')

const parseIngredients = require('./modules/ingredients')
const parseStructure = require('./modules/structure')

// const url = 'http://andychef.ru/recipes/roastedpork'
const url = 'http://localhost:3000/'
const config = ['--load-images=no']
const path = __dirname + '/output/recipe.json'

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
						let ingredients = res[0]
						let stages = res[1]
						let recipe = {
							title: 'test',
							stages: stages,
							ingredients: ingredients
						}
						generateJSON(recipe)
						ph.exit()
					})
				})
		})
	})

const generateJSON = json => {
	try {
		fs.writeFile(path, JSON.stringify(json, null, 2), () => {
			console.log('json has been generated')
		})
	} catch (e) {
		console.log(e)
	}
}