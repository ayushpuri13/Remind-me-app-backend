const { check, validationResult } = require('express-validator');



//-----------------------login-----------------//

exports.login=[
   
     check('email').isEmail().withMessage('Email Format is incorrect')
    .not().isEmpty().withMessage('Email is required'),

    check('password').isLength({min:8}).withMessage('Password must be of atleast 8 characters')
    .not().isEmpty().withMessage('Password is required'),


    (req,res,next)=>{
    	const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.errors[0] });
  }

  next();
    }

  ]

//-------------------Register-------------------//


exports.register=[
   
   check('first_name').not()
   .isEmpty().withMessage('First Name is required'),

    check('last_name').not().isEmpty().withMessage('Last Name is required'),

    check('contact').not().isEmpty().withMessage('Contact Number is required')
    .isLength({min:10,max:10}).withMessage('Contact Number must be of atleast 10 digits'),

    check('email').isEmail().withMessage('Email Format is incorrect')
    .not().isEmpty().withMessage('Email is required'),

    check('password').isLength({min:8}).withMessage('Password must be of atleast 8 characters')
    .not().isEmpty().withMessage('Password is required'),


    (req,res,next)=>{
    	const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.errors[0] });
  }

next();
    }
  ]

  //-------------------------change-password-----------------//

  exports.changePassword=[
   
    check('current-password').isLength({min:8}).withMessage('Password must be of atleast 8 characters')
    .not().isEmpty().withMessage(' Current password is required'),
     

    check('new-password').isLength({min:8}).withMessage('Password must be of atleast 8 characters')
    .not().isEmpty().withMessage('New password is required'),


    (req,res,next)=>{
      const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.errors[0] });
  }

  next();
    }

  ]

//---------------------------forgot-password---------------------//

exports.forgotPassword=[
   
     check('email').isEmail().withMessage('Email Format is incorrect')
    .not().isEmpty().withMessage('Email is required'),
 
   (req,res,next)=>{
      const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.errors[0] });
  }

  next();
    }

  ]

  //----------------------------------reset-password------------------------//

exports.resetPassword=[
   
     check('token').isLength({min:30}).withMessage('Token invalid')
    .not().isEmpty().withMessage('Please provide the token'),

    check('password').isLength({min:8}).withMessage('Password must be of atleast 8 characters')
    .not().isEmpty().withMessage('Password is required'),


    (req,res,next)=>{
      const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.errors[0] });
  }

  next();
    }

  ]


//-----------------------------------------validate email ----------------------------//
exports.validateEmail=[
   
     check('token').isLength({min:30}).withMessage('Token invalid')
    .not().isEmpty().withMessage('Please provide the token'),

  check('email').isEmail().withMessage('Email Format is incorrect')
    .not().isEmpty().withMessage('Email is required'),
    

    (req,res,next)=>{
      const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.errors[0] });
  }

  next();
    }

  ]

//------------------------------------------refresh token ------------------------///

exports.refreshToken=[
   
     check('refresh').isLength({min:30}).withMessage('Token invalid')
    .not().isEmpty().withMessage('Please provide the token'),

  
    (req,res,next)=>{
      const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.errors[0] });
  }

  next();
    }

  ]


//-------------------send verify mail-------------//

exports.sendVerifyMail=[
   
     check('email').isEmail().withMessage('Email Format is incorrect')
    .not().isEmpty().withMessage('Email is required'),
 
   (req,res,next)=>{
      const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.errors[0] });
  }

  next();
    }

  ]
