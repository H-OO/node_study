const fs = require('fs')
const fetch = require('node-fetch')

fs.readFile('./t.zip', (err, data) => {
  if (err) {
    throw err
  }
  upload(data)
})


function upload(buf) {
  console.log(buf)
  const data = buf
  // const data = buf
  fetch('http://127.0.0.1:9000', {
    method: 'POST',
    // headers: {
    //   'Content-Type': 'application/zip'
    // },
    body: data
  })
}




