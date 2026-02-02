import express from 'express';
import verifyJWT from '../middlewares/auth.middlewares.js';

import upload from  '../middlewares/middlewares.js'

import {
  changeTitle,
  changeDescription,
  changeTags,
  updateLikes,
  updateViews,
  uploadVideo,
  updateDislikes,

} from '../controllers/video.controllers.js';


const videoRouter = express.Router();

videoRouter.post('/uploadVideo', verifyJWT, upload.fields([{ name: 'uploadVideo', maxCount: 1 }]), uploadVideo);

videoRouter.patch('/title', verifyJWT, changeTitle);

videoRouter.patch('/description', verifyJWT, changeDescription);

videoRouter.patch('/tags', verifyJWT, changeTags);

videoRouter.patch('/likes', verifyJWT, updateLikes);

videoRouter.patch('/views', verifyJWT, updateViews);

videoRouter.patch('/dislikes', verifyJWT, updateDislikes);

export default videoRouter;
