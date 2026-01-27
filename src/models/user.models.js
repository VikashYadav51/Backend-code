import mongoose from 'mongoose';

import { jwt } from 'jsonwebtoken';

const userSchema = new mongoose.Schema(
    {
        username : {
            type : String,
            required : true,
            unique : true,
            lowercase : true,
            index : true,
        },

        email : {
            type : String,
            required : true,
            unique : true
        },

        password : {
            type : String,
            required : [true, 'Password is required']
        },

        fullName : {
            type : String,
            required : true,

        },

        profilePicture : {
            type : String,
            default : ''
        },

        coverPicture : {
            type : String,
            default : ''
        },

        followers : {
            type : [mongoose.Schema.Types.ObjectId],
            ref : 'User',
            default : [],
        },
        following : {
            type : [mongoose.Schema.Types.ObjectId],
            ref : 'User',
            default : [],

        },

        watchHistory : {
            type : [mongoose.Schema.Types.ObjectId],
            ref : 'Video',
            default : []
        },

        refreshToken : {
            type : String,
        },


    }, {timestamps : true}
);

userSchema.methods.pre('save', async function(next){
    if(!this.isModified('password')) return next();
    const hashingPassword = await bcrypt.hash(this.password, 10);
    this.password = hashingPassword;
    return next();
});

userSchema.methods.isPasswordCorrect = async() => {
    const checkPassword = await bcrypt.compare(this.password, password);
    return checkPassword;
};

userSchema.methods.accessToken = () =>{
    jwt.sign(
        { 
            _id : this._id,
            email : this.email,
            username : this.username,
            fullName : this.fullName,

        },

        process.env.ACCESS_TOKEN_SECRET,

        { expiresIn : process.env.ACCESS_TOKEN_EXPIRY },
    )
};

userSchema.methods.refreshToken = () => {
    jwt.sign(
        {
            _id : this._id,
            email : this.email,
            username : this.username,
            fullName : this.fullName,
        },

        process.env.Refresh_TOKEN_SECRET,

        { expiresIn : process.env.Refresh_TOKEN_EXPIRY, }
    )
};

export const user = mongoose.model('User', userSchema);