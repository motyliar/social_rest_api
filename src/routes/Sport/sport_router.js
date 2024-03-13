const express = require('express');
const PostSportUseCase = require('../../controllers/Sport/usecase/post_sport_usecase');
const GetSportUseCase = require('../../controllers/Sport/usecase/get_sport_usecase');
const router = express.Router();





router.get('/get', GetSportUseCase.getUsers);
router.get('/getSingle/:id', GetSportUseCase.getSingleUser);
router.get('/similar/:sport/:value?', GetSportUseCase.getSimilarUsers);
router.post('/update/:id', PostSportUseCase.createUser);


module.exports = router;

