const express = require('express')

const app = express()
const port = Number(process.env.PORT || 1342)

app.use(express.static(__dirname))
app.listen(port, () => {
  console.log(`desktop is running at http://127.0.0.1:${port}`)
})
