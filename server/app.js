const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const csv = require('csv-parser')
const axios = require('axios')
const cors = require('cors')
const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

const url = 'https://fr.openfoodfacts.org/cgi/search.pl?action=process&search_terms=galette+st+michel&nutrition_grades=e&sort_by=unique_scans_n&download=on'

app.post('/code', async (req, res) => {
  console.log('[POST] code')
  var code = req.body.code

  const result = await axios({
    method: 'get',
    url: `https://world.openfoodfacts.org/api/v0/product/${code}.json`,
    responseType: 'json'
  })

  var info = result.data
  var product = info.product

  var namebis = product.generic_name
  var name = product.product_name
  var nova = product.nova_group
  var nutrition = product.nutrition_grade_fr
  var palme = product.ingredients_from_palm_oil_n
  var palmebis = product.ingredients_that_may_be_from_palm_oil_n
  var picture = product.image_url
  var additives = product.additives_n

  console.log('name : ' + name)
  console.log('namebis : ' + namebis)
  console.log('nova : ' + nova)
  console.log('nutrition : ' + nutrition)
  console.log('palme : ' + palme)
  console.log('palmebis : ' + palmebis)
  console.log('picture : ' + picture)
  console.log('additives : ' + additives)

  // two possible fields for name
  if (name === null || name === '') {
    name = namebis
  }

  var fields = [
    { name: name,
      nova: nova,
      nutrition: nutrition,
      palme: palme,
      palmebis: palmebis,
      picture: picture,
      additives: additives }
  ]
  res.send(fields)
})

app.post('/search', async (req, res) => {
  console.log('[POST] search')
  const result = await axios({
    method: 'get',
    url: url,
    responseType: 'stream'
  })

  const results = []

  var list = []

  result.data.pipe(csv({ separator: '\t' }))
    .on('data', (data) => results.push(data))
    .on('end', () => {
      for (var i = 0; i < results.length; i++) {
        var item = results[i]
        const code = item['code']
        const product_name = item['product_name']
        const origins = item['origins'].split(',')
        const manufacturing_places = item['manufacturing_places'].split(',')
        const ingredients_text = item['ingredients_text'].split(', ')
        const additives_n = item['additives_n']
        const additives_tags = item['additives_tags'].split(',')
        const ingredients_from_palm_oil_n = item['ingredients_from_palm_oil_n']
        const nutriscore_score = item['nutriscore_score']
        const nutriscore_grade = item['nutriscore_grade']
        const nova_group = item['nova_group']
        const image_url = item['image_url']
        const energy_100g = item['energy_100g'][0]

        list.push({
          code: code,
          product_name: product_name,
          origins: origins,
          manufacturing_places: manufacturing_places,
          ingredients_text: ingredients_text,
          additives_n: additives_n,
          additives_tags: additives_tags,
          ingredients_from_palm_oil_n: ingredients_from_palm_oil_n,
          nutriscore_score: nutriscore_score,
          nutriscore_grade: nutriscore_grade,
          nova_group: nova_group,
          image_url: image_url,
          energy_100g: energy_100g
        })
      }

      console.log(list)
      res.send(list)
    })
})

app.listen(3000)
