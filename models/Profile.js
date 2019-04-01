const mongoose  = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref:'users'
    },
    handle: {
        type: String,
        required: true,
        max:60
    },
    company: {
        type: String
    },
    website: {
        type: String
    },
    location: {
        type: String
    },
    status: {
        type: String,
        required: true
    },
    skills: {
        type: [String],
        required: true
    },
    bio: {
        type: String
    },
    githubusername: {
        type: String
    },
    experience: [
        {
            title:{
                type: String,
                required: true
            },
            company:{
                type: String,
                required: true
            },
            location:{
                type: String,
                required: true
            },
            from:{
                type: Date,
                required: true
            },
            to:{
                type:Date,
                required: true
            },
            current:{
                type: Boolean,
                default: true
            },
            description:{
                type: String
            }


         }
    ],
    education: [
        {
            schooling:{
                type: String,
                required: true
            },
            deg:{
                type: String,
                required: true
            },
            Areaofstudy:{
                type: String,
                required: true
            },
            from:{
                type: Date,
                required: true
            },
            to:{
                type:Date,
                required: true
            },
            current:{
                type: Boolean,
                default: true
            }


         }
    ],
    onlinemedia:[
        {   
        facebook:{
            type: String

        },
        linkedin:{
            type: String
        }
    }
    ],
    date:{
        type:Date,
        default: Date.now
    }

});
console.log("here too");
module.exports = Profile = mongoose.model('profile',ProfileSchema);