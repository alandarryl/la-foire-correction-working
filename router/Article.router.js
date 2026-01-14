const express = require('express');
const router = express.Router();

// IMPORTATION DU CONTROLLER 
const ArticleController = require('../controllers/Article.controller');
const verifyToken = require('../middlewares/auth');

router.get('/all', ArticleController.getAll);
router.post('/add', ArticleController.postArticle);
router.get('/getOne/:id', ArticleController.getArticleById);
router.delete('/delete/:id', ArticleController.deleteArticle);
router.put('/update/:id', ArticleController.updateArticle);

module.exports = router