const express =require('express')
const router =express.Router()
const blogControllers =require('../controllers/blogControllers')

router.get('/', blogControllers.home)
router.get('/posts', blogControllers.posts)
router.post('/', blogControllers.post)
router.get('/register', blogControllers.register)
router.post('/register', blogControllers.registerPost)
router.get('/login', blogControllers.login)
router.post('/login', blogControllers. loginPost)

module.exports =router;


 