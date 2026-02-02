import express from 'express';
import verifyJWT from '../middlewares/auth.middlewares.js';
import { loadVideoByUrl, loadVideoById, verifyVideoOwner } from '../middlewares/video.middlewares.js';

import {
  changeTitle,
  changeDescription,
  changeTags,
  updateLikes,
  updateViews,
  updateDislikes,

} from '../controllers/video.controllers.js';

const videoRouter = express.Router();

videoRouter.patch('/title', verifyJWT, changeTitle);

videoRouter.patch('/description', verifyJWT, changeDescription);

videoRouter.patch('/tags', verifyJWT, changeTags);

videoRouter.patch('/likes', verifyJWT, updateLikes);

videoRouter.patch('/views', verifyJWT, updateViews);

videoRouter.patch('/dislikes', verifyJWT, updateDislikes);

export default videoRouter;
