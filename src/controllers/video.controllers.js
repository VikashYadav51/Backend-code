import { Video } from "../models/video.models.js";

import ApiResponse from "../utils/ApiResponse.js";

import ApiError from "../utils/ApiError.js";

import asyncHandler from "../utils/asyncHandler.js";


const changeTitle = asyncHandler( async(req, res) =>{
    const { videoUrl, title } = req.body;

    const video = await Video.findOne({ videoUrl });

    if(!video){
        throw new ApiError(404, "Video not found", { videoUrl });
    }

    video.title = title;
    await video.save({validateBeforeSave : true});
    
    return res.status(200).json(
        new ApiResponse(200, video, "Title changed successfully")
    );
})

const changeDescription = asyncHandler( async(req, res) =>{
    const { videoUrl, description } = req.body;

    const video = await Video.findOne({ videoUrl });

    if(!video){
        throw new ApiError(404, "Video not found", { videoUrl });
    }

    video.description = description;
    await video.save({validateBeforeSave : true});
    
    return res.status(200).json(
        new ApiResponse(200, video, "Description changed successfully")
    );
});

const changeTags = asyncHandler( async(req, res) =>{
    const { videoUrl, tags } = req.body;

    const video = await Video.findOne({ videoUrl });

    if(!video){
        throw new ApiError(404, "Video not found", { videoUrl });
    }

    video.tags = tags;
    await video.save({validateBeforeSave : true});
    
    return res.status(200).json(
        new ApiResponse(200, video, "Tags changed successfully")
    );
});

const updateLikes = asyncHandler( async(req, res) =>{
    const { videoUrl, likes } = req.body;

    const video = await Video.findOne({ videoUrl });

    if(!video){
        throw new ApiError(404, "Video not found", { videoUrl });
    }

    video.likes = likes;
    await video.save({validateBeforeSave : true});
    
    return res.status(200).json(
        new ApiResponse(200, video, "Likes changed successfully")
    );
});

const updateViews = asyncHandler( async(req, res) =>{
    const { videoUrl, views } = req.body;

    const video = await Video.findOne({ videoUrl });

    if(!video){
        throw new ApiError(404, "Video not found", { videoUrl });
    }

    video.views = views;
    await video.save({validateBeforeSave : true});
    
    return res.status(200).json(
        new ApiResponse(200, video, "Views changed successfully")
    );
});

const updateDislikes = asyncHandler( async(req, res) =>{
    const { videoUrl, dislikes } = req.body;

    const video = await Video.findOne({ videoUrl });

    if(!video){
        throw new ApiError(404, "Video not found", { videoUrl });
    }

    video.dislikes = dislikes;
    await video.save({validateBeforeSave : true});
    
    return res.status(200).json(
        new ApiResponse(200, video, "Dislikes changed successfully")
    );
});


export {
    changeTitle,
    changeDescription,
    changeTags,
    updateLikes,
    updateViews,
    updateDislikes,
}
