const express = require('express')
const {
  register, 
  login, 
  logout,
  getMe,
  updatePassword
} = require('../controllers/auth')

const {protect} = require('../middleware/auth')

const router = express.Router()

router.post('/register', register)
router.post('/login', login)

router.get("/logout", logout)
router.get("/me", protect, getMe)
router.put("/updatepassword", protect, updatePassword)

module.exports = router;