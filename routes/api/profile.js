const express  = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const router = express.Router();
const vip = require('../../validation/profile');
const vep = require('../../validation/experience');
const veducationp = require('../../validation/education');

//Loding profile model

const Profile = require('../../models/Profile');

//Loading user model

const User = require('../../models/User');


// route: GET api/profile
// desc: get current users profile
// access: Private

router.get('/', passport.authenticate('jwt',{ session : false}), (req,res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
        .populate('user',['name','avatar'])
    .then(prof => {
        if(!prof) {
            errors.noprof = 'no profile';
            return res.status(404).json(errors);
        }
        res.json(prof);
    })
    .catch(err => res.status(404).json(err));
}
);

// route: get api/profile/all
// desc: getting all users profile
// access: Public

router.get('/allprofile', (req,res) => {
    const errors = {};
    Profile.find( )
    .populate('user',['name','avatar'])
    .then(prof => {
        if(!prof){
            errors.noprof = ' no profile';
            return res.status(400).json(errors);
        }
        res.json(prof);
    })
    .catch(err => res.status(404).json(err));
})
// route: get api/profile/handle/:handle
// desc: getting a users profile by handle
// access: Public

router.get('/handle/:handle', (req,res) => {
    const errors = {};
    Profile.findOne({handle : req.params.handle})
    .populate('user',['name','avatar'])
    .then(prof => {
        if(!prof){
            errors.noprof = ' no profile';
            return res.status(400).json(errors);
        }
        res.json(prof);
    })
    .catch(err => res.status(404).json(err));
})

// route: get api/user/:userid
// desc: getting a users profile by handle
// access: Public

router.get('/user/:user_id', (req,res) => {
    const errors = {};
    Profile.findOne({user : req.params.handle})
    .populate('user',['name','avatar'])
    .then(prof => {
        if(!prof){
            errors.noprof = 'no profile';
            return res.status(400).json(errors);
        }
        res.json(prof);
    })
    .catch(err => res.status(404).json(err));
})


// route: Post api/profile
// desc: creating a users profile
// access: Private

router.post('/',passport.authenticate('jwt',{session:false}), (req,res) => {
    const { errors, isValid} = vip(req.body)

    if(!isValid)
    {
        return res.status(400).json(errors);
    }
    const profflds = {};
    profflds.user = req.user.id;
    console.log(profflds.user);
    if(req.body.handle) profflds.handle = req.body.handle;
    if(req.body.company) profflds.company = req.body.company;
    if(req.body.website) profflds.website = req.body.website;
    if(req.body.location) profflds.location = req.body.location;
    if(req.body.status) profflds.status = req.body.status;
    if(req.body.githubusername) profflds.githubusername = req.body.githubusername;
    if(req.body.bio) profflds.bio = req.body.bio;
     
    if(typeof req.body.skills !== undefined) {
        profflds.skills = req.body.skills.split(',');
    }

    profflds.onlinemedia = {};
    if(req.body.facebook) profflds.onlinemedia.facebook = req.body.facebook;
    if(req.body.linkedin) profflds.onlinemedia.linkedin = req.body.linkedin;

    Profile.findOne({ user:req.user.id })
    .then(prof => {
        if(prof){ //logic for update
            Profile.findOneAndUpdate(
                    { user: req.user.id}, 
                    { $set: profflds}, 
                    { new:true}
                 ).then( prof => res.json(prof));
                    
        } 
        else {
            Profile.findOne({ handle: profflds.handle }).then(profile => {
                if (profile) {
                  errors.handle = 'That handle already exists';
                  res.status(400).json(errors);
                }
      
                // if no profile found then create  and save
                new Profile(profflds).save().then(prof => res.json(prof));
        });
    }
    })
})
    ;

// route: post api/profile/experience
// desc: adding expereince to users profile
// access: Private

router.post('/experience', passport.authenticate('jwt',{ session : false}), (req,res) => {

    const { errors, isValid} = vep(req.body);

    if(!isValid)
    {
        return res.status(400).json(errors);
    }
    Profile.findOne({ user: req.user.id })
    .then(prof => {
        const newExperience = {
            title: req.body.title,
            company: req.body.company,
            location: req.body.location,
            from: req.body.from,
            to: req.body.to,
            current: req.body.current,
            description: req.body.description
}
        prof.experience.unshift(newExperience);

        prof.save().then(prof => res.json(prof));
        
    })
    
}
);

// route: post api/profile/education
// desc: adding education to users profile
// access: Private

router.post('/education', passport.authenticate('jwt',{ session : false}), (req,res) => {

    const { errors, isValid} = veducationp(req.body);

    if(!isValid)
    {
        return res.status(400).json(errors);
    }
    Profile.findOne({ user: req.user.id })
    .then(prof => {
        const neweducation = {
            schooling: req.body.schooling,
            deg: req.body.deg,
            Areaofstudy: req.body.Areaofstudy,
            from: req.body.from,
            to: req.body.to,
            current: req.body.current
}
        prof.education.unshift(neweducation);

        prof.save().then(prof => res.json(prof));
        
    })
    
}
);


// route: delete api/profile/experience/:exp_id
// desc: deleting a users experience by exp_id
// access: Private

router.delete('/experience/:exp_id', passport.authenticate('jwt',{ session : false}), (req,res) => {
    
    Profile.findOne({user : req.user.id})
    .then(prof => {
      
        const removeexperience = prof.experience.map(element => element.id).indexOf(req.params.exp_id);
        

        prof.experience.splice(removeexperience,1);

        prof.save().then(prof => res.json(prof));
    })
        
    .catch(err => res.status(404).json(err));
});

// route: delete api/profile/education/:edu_id
// desc: deleting a users education by edu_id
// access: Private

router.delete('/education/:edu_id', passport.authenticate('jwt',{ session : false}), (req,res) => {
    
    Profile.findOne({user : req.user.id})
    .then(prof => {
        console.log(prof)
        var removeEdu=prof.education.map(element => element.id).indexOf(req.params.edu_id);
        prof.education.splice(removeEdu,1);
        prof.save().then(prof => res.json(prof));
    })
        
    .catch(err => res.status(404).json(err));
});
module.exports = router;