import ApiError from '../utils/ApiError.js';

import { Channel } from '../models/channel.models.js';

import  asyncHandler  from '../utils/asyncHandler.js';

const verifyChannelOwner = asyncHandler( async(req, res, next) =>{
    const channelOwner = await Channel.findById(req.params.channelId);
    console.log(channelOwner);
    
    if(!channelOwner){
        throw new ApiError(404, "Channel not found", { channelId : req.params.channelId });
    }

    if(channelOwner.owner.toString() !== req.user?._id.toString()){
        throw new ApiError(403, "You are not the owner of this channel");
    }

    req.channelOwner = channelOwner;
    
    next();
});

export default verifyChannelOwner;

