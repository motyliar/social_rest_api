const express = require('express');

const router = express.Router();
const PostSportUseCase = require('../../controllers/Sport/usecase/post_sport_usecase');




router.post('/update', PostSportUseCase.createUser);

