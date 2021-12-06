const express = require('express')
const cors = require('cors')
const multer = require('multer')

const app = express()

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  },
})

var upload = multer({ storage: storage }).single('file')

app.use(cors())

const url2 = '/uploadHere'
app.post(url2, function (req, res) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err)
    } else if (err) {
      return res.status(500).json(err)
    }
    console.log('success')
    console.log(req.file)
    return res.status(200).send(req.file)
  })
})
app.listen(8080, () => {
  console.log(`Server is running on port 8080`)
})
