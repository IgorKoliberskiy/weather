const http = require('http')
const readline = require('readline');
const defaultCity = require('./config')

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

const myAPIKey = process.env.myAPIKey

rl.question('Введите город для получения прогноза погоды: ', city => {
  if(!city) {
    city = defaultCity.city
  }
  
  const url = `http://api.weatherstack.com/current?access_key=${myAPIKey}&query=${city}`;

  http.get(url, (res) => {
    const {statusCode} = res
    if (statusCode !== 200) {
      console.log(statusCode)
      return
    }
  
    res.setEncoding('utf-8')
    let rowData = ''
    res.on('data', (chunk) => rowData += chunk)
    res.on('end', () => {
      let parseData = JSON.parse(rowData)
      console.log(parseData)
    })
  }).on('error', (err) => {
    console.error(err)
  })

  rl.close()
})






