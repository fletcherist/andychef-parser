'use strict'

var page = require('webpage').create()
var url = 'http://www.edimdoma.ru/retsepty/82622-syrniki-s-risovoy-mukoy'

page.open(url, function(status) {
  var recipeName = page.evaluate(function() {
    var recipeName = document.querySelector('.recipe-header__name').innerText
    return recipeName
  })
  // console.log(recipeName)

  var ingredients = page.evaluate(function() {
    var ingredientsWrapper = document.querySelector('[itemprop="ingredients"]')
    var _ingredients = ingredientsWrapper.querySelectorAll('.definition-list-table')
    var ingredients = []
    for (var i = 0; i < _ingredients.length; i++) {
      // console.log(ingredients[i])
      var _ingredient = _ingredients[i]
      var ingredient = {}
      ingredient.name = _ingredient.querySelector('.definition-list-table__td').innerText
      ingredient.value = _ingredient.querySelector('.definition-list-table__td_value').innerText
      ingredients.push(ingredient)
    }
    return ingredients
  })
  // console.log(ingredients)

  var stages = page.evaluate(function() {
    var _stagesWrapper = document.querySelector('[itemprop="recipeInstructions"]')
    var _stages = document.querySelectorAll('.content-box')
    return 42
    // for (var i = 0; i < _stages.length; i++) P{
      // var _stage = _stages[i]
      // var stage = _stage.querySelector('.section-title .title .title_sans-serif .title_small').innerText
      // console.log(stage)
    // }
    // console.log(_stages)
  })
  console.log(stages)

  phantom.exit()
})


function parseIngredients () {

}

page.onConsoleMessage = function(msg) {
  console.log(msg);
}

page.onError = function (err) {
  console.log(err)
}
phantom.onError = function(msg, trace) {
  var msgStack = ['PHANTOM ERROR: ' + msg]
  if (trace && trace.length) {
    msgStack.push('TRACE:')
    trace.forEach(function(t) {
      msgStack.push(' -> ' + (t.file || t.sourceURL) + ': ' + t.line + (t.function ? ' (in function ' + t.function +')' : ''))
    })
  }
  console.error(msgStack.join('\n'))
  phantom.exit(1)
};
