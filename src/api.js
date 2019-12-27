var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
const csv = require('csv-parser')
const axios = require('axios')
const cors = require('cors')
const createError = require('http-errors')
const fs = require('fs')

var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')

var app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

/* app.post('/code', async (req, res) => {
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
}) */

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// const url = 'https://fr.openfoodfacts.org/cgi/search.pl?action=process&search_terms=cacao&sort_by=unique_scans_n&page_size=1&download=on'

const url = 'https://fr.openfoodfacts.org/cgi/search.pl?action=process&search_terms=galette+st+michel&nutrition_grades=e&sort_by=unique_scans_n&download=on'

const Stop = require('./stop.model.js')

async function run () {
  // await Stop.deleteMany({})
  await importCSV('./stops.txt', stopsHandler)
  process.exit(0)
}

async function stopsHandler (array, counter) {
  const stops = array.map(_ => ({
    _id: parseInt(_.stop_id),
    stop_code: orUndef(_.stop_code),
    stop_name: orUndef(_.stop_name),
    stop_desc: orUndef(_.stop_desc),
    stop_coords: {
      type: 'Point',
      coordinates: [parseFloat(_.stop_lon), parseFloat(_.stop_lat)]
    },
    location_type: parseInt(_.location_type),
    parent_station: intOrUndef(_.parent_station)
  }))

  return Stop.collection.insertMany(stops)
}

function intOrUndef (v) {
  return v ? parseInt(v) : undefined
}

function orUndef (v) {
  return v || undefined
}

// Use this function because it ensure asynchronous reading of csv file

/**
 * @param {String} filePath
 * @param {Function} save
 * @param {Number} [batchSize=10000]
 * @async
 */
function importCSV (filePath, save, batchSize = 10000) {
  console.log('begin')
  return new Promise((resolve, reject) => {
    let counter = 1
    const tmp = []
    const stream = fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', async (data) => {
        try {
          if (tmp.length < batchSize) {
            tmp.push(data)
            return
          }
          stream.pause()
          await save(tmp, counter++)
          tmp.length = 0
          stream.resume()
        } catch (err) {
          stream.destroy()
          reject(err)
        }
      })
      .on('end', async () => {
        if (tmp.length > 0) {
          await save(tmp, counter++)
        }
        resolve()
      })
  })
}

console.log('before run')
// run()

const getStream = require('get-stream')
var filePath = 'openfoodfacts_search_4.csv'

/* async function test () {
  async function readCSVData (filePath) {
    const parseStream = csv({ delimiter: '\t' })
    const data = await getStream.array(fs.createReadStream(filePath).pipe(parseStream))
    // return data.map(line => line.join(',')).join('\n')
    // console.log(data)
    return data[1][0]
  }
  try {
    const result = await readCSVData('openfoodfacts_search.csv')
    console.log(result)
  } catch (err) {
    console.error('something went wrong', err)
  }
}

test() */

/* var list = []

async function readCSVData (filePath) {
  const parseStream = csv({ delimiter: '\t' })
  var data = await getStream.array(fs.createReadStream(filePath).pipe(parseStream))

  // return data.map(line => line.join(',')).join('\n')
  return data
}

async function asyncCall () {
  console.log('calling')
  var result = await readCSVData(filePath)
  var row = result[1] // row 1
  // console.log(row)

  for (var i in row) {
    console.log(row[i].split('\t'))
  }

  var head = row[0].split('\t')
  var ingredients = row[8].split('\t')

  // console.log(head)
  // console.log(ingredients)

  var item = head
  const code = item[0]
  const url = item[1]
  const creator = item[2]
  const created_t = item[3]
  const last_modified_t = item[4]
  const product_name = item[5]
  const generic_name = item[6]
  const quantity = item[7]
  const packaging = item[8]
  const packaging_tags = item[9]
  const brands = item[10]
  const brands_tags = item[11]
  const categories = item[12]
  const ingredients_text = ingredients[14].split(', ')
  const nova_group = ingredients[32]
  list.push({
    code: code,
    url: url,
    creator: creator,
    created_t: created_t,
    last_modified_t: last_modified_t,
    product_name: product_name,
    generic_name: generic_name,
    quantity: quantity,
    packaging: packaging,
    packaging_tags: packaging_tags,
    brands: brands,
    brands_tags: brands_tags,
    categories: categories,
    ingredients_text: ingredients_text,
    nova_group: nova_group
  })

  console.log(list)
}

asyncCall() */

/* function resolveAfter2Seconds () {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved')
    }, 2000)
  })
}

async function asyncCall () {
  console.log('calling')
  var result = await resolveAfter2Seconds()
  console.log(result)
  // expected output: 'resolved'
}

asyncCall() */

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// requête get sur http://localhost/products
// http://localhost:3000/products?search_terms=findus
/* app.get('/products', async (req, res, next) => {
  // const searchTerms = req.query['search_terms']

  const searchTerms = 'cacao'
  const result = await axios({
    method: 'get',
    url: `https://fr.openfoodfacts.org/cgi/search.pl?action=process&search_terms=${searchTerms}&sort_by=unique_scans_n&page_size=1&download=on`,
    responseType: 'stream'
  })

  const results = []

  result.data.pipe(csv({ separator: '\t' }))
    .on('data', (data) => results.push(data))
    .on('end', () => {
      console.log(results)
      res.json(results)
    })
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
}) */

/* fs.createReadStream(filePath)
  .pipe(csv())
  .on('data', (row) => {
    setTimeout(() => {
      // console.log(row)
    }, 2000)
  })
  .on('end', () => {
    console.log('CSV file successfully processed')
  }) */

/* async function yo () {
  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', function (data) {
      try {
        // perform the operation
        console.log(data[0][1])
      } catch (err) {
        // error handler
      }
    })
    .on('end', function () {
      // some final operation
    })
}

yo() */

async function hey () {
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
    })
}

hey()

module.exports = app
