import express from 'express';
import verifyJWT from '../middlewares/auth.middlewares.js';
import verifyChannelOwner from '../middlewares/channel.middleware.js';

import {
  changeChannelName,
  changeDescription,
  findSubscribers,
} from '../controllers/channel.controllers.js';

const channelRouter = express.Router();    

channelRouter.patch('/name', verifyJWT, verifyChannelOwner, changeChannelName);
channelRouter.patch('/description', verifyJWT, verifyChannelOwner, changeDescription);
channelRouter.get('/subscribers', verifyJWT, verifyChannelOwner, findSubscribers);

export default channelRouter;
