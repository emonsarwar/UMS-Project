import multer from 'multer'

const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf']

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, callback) => {
    if (!allowedMimeTypes.includes(file.mimetype)) {
      callback(new Error('Unsupported file type.'))
      return
    }
    callback(null, true)
  },
})
