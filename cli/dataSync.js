process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const config = require('../src/config')
const axios  = require("axios")
const chalk  = require("chalk")
const fs     = require("fs")

const start   = new Date()
const baseUrl = `${config.baseUrl}/wp-json/wp/v2/`

const recurseByPage = (url) => {
  return new Promise((resolve, reject) => {
    const results = []
    const recurse = (url, page) => {
      console.log(chalk.white(`Starting scrape of ${url}?&page=${page}`))
      axios.get(`${url}?&page=${page}`)
        .then(({headers, data}) => {
          const totalPages = headers['x-wp-totalpages']
          results.push(...data)

          if(page < totalPages){
            recurse(url, page + 1)
          } else {
            console.log(chalk.blue(`Scrape of ${url} complete in ${new Date - start}ms`))
            resolve(results)
          }
        })
        .catch(({message}) => reject(message))
    }
    recurse(url, 1)
  })
}

const handleTaxonomyRes = ({headers, data}) => {
  //console.log(headers)
  const taxonomies = Object.getOwnPropertyNames(data)
  const count      = taxonomies.length
  const results    = {}
  let   complete   = 0

  console.log(chalk.white(`Taxonomies found: ${taxonomies.join(', ')}`))
  return new Promise((resolve, reject) => {
    taxonomies.forEach(taxonomy => {
      const url = `${data[taxonomy]._links['wp:items'][0].href}`
      recurseByPage(url)
        .then(terms => {
          results[data[taxonomy].rest_base] = terms

          complete = complete + 1
          if(complete === count){
            resolve(results)
          }
        })
        .catch(err => reject(err))
    })
  })
}

const exportJson = (data, name) => {
  try {
    fs.writeFileSync(`${__dirname}/../src/_data/${name}.json`, JSON.stringify(data))
    console.log(chalk.green(`Exported ${name} data in ${new Date() - start}ms`))
  }
  catch(e){
    console.log(chalk.red(e))
  }
}

console.log(chalk.white(`Starting scrape of ${baseUrl}taxonomies`))
axios.get(`${baseUrl}taxonomies`)
  .then(res => {
    console.log(chalk.blue(`Scrape of ${baseUrl}taxonomies complete in ${new Date() - start}ms`))
    handleTaxonomyRes(res)
      .then((data) => exportJson(data, 'taxonomy'))
      .catch(err => console.log(chalk.red(err)))
  })
  .catch(({message}) => console.log(chalk.red(message)))

console.log(chalk.white(`Starting scrape of ${baseUrl}users`))
recurseByPage(`${baseUrl}users`)
  .then((data) => exportJson(data, 'authors'))
  .catch(err => console.log(chalk.red(err)))
