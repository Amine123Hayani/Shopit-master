import { Router } from 'express'
import multer from 'multer'
import path from 'path'
const router = Router()

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    )
  },
})

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
})

function checkFileType(file, cb) {
  const fileTypes = /jpg|jpeg|png/
  const extname = fileTypes.test(
    path.extname(file.originalname).toLocaleLowerCase()
  )
  const mimeType = fileTypes.test(file.mimetype)
  if (extname && mimeType) {
    return cb(null, true)
  } else {
    return cb('Images only !!', false)
  }
}

router.post('/', upload.single('image'), (req, res) => {
  res.send(`/${req.file.path}`)
})

export default router
