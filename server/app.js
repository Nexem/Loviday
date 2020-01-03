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

app.post('/code', async (req, res) => {
  console.log('[POST] code')
  var code = req.body.code

  const result = await axios({
    method: 'get',
    url: `https://world.openfoodfacts.org/api/v0/product/${code}.json`,
    responseType: 'json'
  })

  var item = result.data.product

  // console.log(item.code)

  var element = {
    code: item.code,
    product_name: item.product_name,
    origins: item.origins.split(','),
    manufacturing_places: item.manufacturing_places.split(','),
    ingredients_text: item.ingredients_text.split(','),
    additives_n: item.additives_n,
    additives_tags: item.additives_tags,
    ingredients_from_palm_oil_n: item.ingredients_from_palm_oil_n,
    nutriscore_score: item.nutriscore_score,
    nutriscore_grade: item.nutriscore_grade,
    nova_group: item.nova_group,
    image_url: item.image_url,
    energy_100g: item.energy_100g
  }

  res.send(element)
})

app.post('/search', async (req, res) => {
  console.log('[POST] search')

  const beginurl = 'https://fr.openfoodfacts.org/cgi/search.pl?action=process'
  const endurl = 'sort_by=unique_scans_n&download=on'
  // &nutrition_grades=e

  if (req.body.researchQuery !== undefined) {
    const obj = req.body.researchQuery
    const name = obj.product_name

    console.log(name)

    const url = `${beginurl}&search_terms=${name}&${endurl}`

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

          list.push({
            code: item.code,
            product_name: item.product_name,
            origins: item.origins.split(','),
            manufacturing_places: item.manufacturing_places.split(','),
            ingredients_text: item.ingredients_text.split(','),
            additives_n: item.additives_n,
            additives_tags: item.additives_tags,
            ingredients_from_palm_oil_n: item.ingredients_from_palm_oil_n,
            nutriscore_score: item.nutriscore_score,
            nutriscore_grade: item.nutriscore_grade,
            nova_group: item.nova_group,
            image_url: item.image_url,
            energy_100g: item.energy_100g
          })
        }

        console.log(list)
        res.send(list)
      })
  } else {
    res.send('error')
  }
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

app.listen(3000)
