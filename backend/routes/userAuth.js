const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const {registerValidation,loginValidation } = require('../validations/userValidation');



router.route('/').get((req,res) => {
    res.send('whaup biatch');
    console.log('whats up motherfucker');
})
router.route('/register').post(async (req,res) => {
    const {error} = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);


    //checkIf email already exists
    const emailExists = await User.findOne({email : req.body.email });
    if(emailExists) return res.status(400).send('Email Already Exists');
//   res.send(error);

    //hashing password
    const salt = await bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hashSync(req.body.password,salt);


    const user =  new User({
        name : req.body.name,
        email : req.body.email,
        password : hashPassword,  
    });

    await user.save()
        .then(() => res.send(user))
        .catch(err =>  res.status(400).send(err))
    

});

router.route('/login').post(async (req, res) => {
    //loginValidation
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);


    //checkIf email already exists
    try {
        const user  = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).send('Email doesnot  Exists');
        //   res.send(error);

        const checkIf = await bcrypt.compareSync(req.body.password, user.password);
        if (!checkIf) return res.status(400).send('password doesnt match');
    }
    catch(err) {
        res.status(400).send(err);
    }
   

    res.send('logged in!');


});




module.exports = router;