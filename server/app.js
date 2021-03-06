const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const csv = require('csv-parser')
const axios = require('axios')
const cors = require('cors')
const serveStatic = require('serve-static')
const app = express()

// For DB Communication
const mysql = require('mysql')

// view engine setup
// app.set('views', path.join(__dirname, 'views'))
// app.set('view engine', 'ejs')

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use('/', serveStatic(path.join(__dirname, '/dist')))

/*
*
* Queries for DB Loviday
*
*/
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'loviday'
})

app.post('/auth', async function (request, response) {
  const objUser = request.body.user
  const email = objUser.email
  const pwd = objUser.pwd

  if (email && pwd) {
    connection.query('SELECT * FROM users WHERE email = \'' + email + '\' AND pwd = \'' + pwd + '\';', function (err, result, fields) {
      if (err) throw err
      if (result.length > 0) {
        console.log(response)

        response.send(objUser)
      } else {
        response.send(null)
      }
      response.end()
    })
  } else {
    response.send(null)
    response.end()
  }
})

app.post('/register', async (request, response) => {
  const objUser = request.body.registerUser
  const email = objUser.email
  const pwd = objUser.pwd
  const lastname = objUser.lastname
  const firstname = objUser.firstname

  if (email && pwd && lastname && firstname) {
    connection.query('INSERT INTO users (email,prenom,nom,pwd) VALUES (?,?,?,?)', [email, firstname, lastname, pwd], function (err, results, fields) {
      if (err) throw err

      console.log(results)

      if (results.length > 0) {
        response.send(objUser)
      } else {
        response.send(null)
      }
      response.end()
    })
  } else {
    response.send(null)
    response.end()
  }
})

app.post('/insertList', async (request, response) => {
  const objUser = request.body.product
  const code = objUser.code
  const email = objUser.email

  if (email && code) {
    connection.query('INSERT INTO list (code,email) VALUES (?,?)', [code, email], function (err, results, fields) {
      if (err) throw err

      console.log(results)

      response.end()
    })
  } else {
    response.end()
  }
})

app.post('/getList', async (request, response) => {
  const obj = request.body.emailUser
  const email = obj.email
  if (email) {
    connection.query('SELECT * FROM list WHERE Email = ?', [email], function (err, results, fields) {
      if (err) throw err

      if (results.length > 0) {
        response.send(results)
      } else {
        response.send(null)
      }
      response.end()
    })
  } else {
    response.end()
  }
})

app.post('/insertFavs', async (request, response) => {
  const objUser = request.body.product
  const code = objUser.code
  const email = objUser.email
  console.log('infos', code, email)

  if (email && code) {
    connection.query('INSERT INTO favorite (Code,Email) VALUES (?,?)', [code, email], function (err, results, fields) {
      if (err) throw err

      console.log(results)

      response.end()
    })
  } else {
    response.end()
  }
})

app.post('/getFavs', async (request, response) => {
  const obj = request.body.emailUser
  const email = obj.email
  if (email) {
    connection.query('SELECT * FROM favorite WHERE Email = ?', [email], function (err, results, fields) {
      if (err) throw err

      if (results.length > 0) {
        response.send(results)
      } else {
        response.send(null)
      }
      response.end()
    })
  } else {
    response.end()
  }
})

app.post('/deleteFavs', async (request, response) => {
  const objUser = request.body.infos
  const code = objUser.code
  const email = objUser.email
  console.log('infos', code, email)

  if (email && code) {
    connection.query('DELETE FROM favorite WHERE Code = ? AND Email = ?', [code, email], function (err, results, fields) {
      if (err) throw err

      console.log(results)

      response.end()
    })
  } else {
    response.end()
  }
})

app.post('/deleteList', async (request, response) => {
  const objUser = request.body.infos
  const code = objUser.code
  const email = objUser.email
  console.log('infos', code, email)

  if (email && code) {
    connection.query('DELETE FROM list WHERE code = ? AND Email = ?', [code, email], function (err, results, fields) {
      if (err) throw err

      console.log(results)

      response.end()
    })
  } else {
    response.end()
  }
})

// Query API
app.post('/code', async (req, res) => {
  console.log('[POST] code')
  const code = req.body.code

  const result = await axios({
    method: 'get',
    url: `https://world.openfoodfacts.org/api/v0/product/${code}.json`,
    responseType: 'json'
  })

  const item = result.data.product

  // console.log(item.code)

  const element = {
    code: item.code,
    product_name: item.product_name,
    origins: item.origins,
    manufacturing_places: item.manufacturing_places,
    ingredients_text: item.ingredients_text,
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

  const beginUrl = 'https://fr.openfoodfacts.org/cgi/search.pl?action=process'
  const endUrl = '&sort_by=unique_scans_n&download=on'
  // &nutrition_grades=e

  if (req.body.researchQuery !== undefined) {
    const obj = req.body.researchQuery
    // console.log(obj)

    // const name = obj.product_name
    let request = ''

    if (obj.product_name !== '') {
      request = request.concat('&search_terms=', obj.product_name)
    }

    if (obj.origins !== '') {
      request = request.concat('&origins=France')
    }

    if (obj.nutriscore_score !== '') {
      request = request.concat('&nutrition_grades=', obj.nutriscore_score.toLowerCase())
    }

    if (obj.nova_group !== '') {
      request = request.concat('&nova_groups=', obj.nova_group)
    }

    if (obj.additives_n === true) {
      request = request.concat('&additives=without')
    }

    if (obj.ingredients_from_palm_oil_n === true) {
      request = request.concat('&ingredients_from_palm_oil=without')
    }

    request = request.concat('&countries=France') // indicates that the product is sold in France

    // console.log(request)

    // const url = `${beginUrl}&search_terms=${name}&${endUrl}`
    const url = beginUrl.concat(request, endUrl)
    // console.log('url ! ', url)

    const result = await axios({
      method: 'get',
      url: url,
      responseType: 'stream'
    })

    // console.log(result)

    const results = []

    const list = []

    result.data.pipe(csv({ separator: '\t' }))
      .on('data', (data) => results.push(data))
      .on('end', () => {
        console.log(results.length, 'results')
        for (let i = 0; i < results.length; i++) {
          const item = results[i]

          list.push({
            code: item.code,
            product_name: item.product_name,
            origins: item.origins,
            manufacturing_places: item.manufacturing_places,
            ingredients_text: item.ingredients_text,
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

        // console.log(list)
        console.log('Products processed')
        if (list.length === 535) {
          res.send('error')
        } else {
          res.send(list)
        }
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
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

app.listen(3000)
