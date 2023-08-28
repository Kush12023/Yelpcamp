const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const { storeReturnTo } = require('../middleware');
const users=require('../controllers/users');

router.route('/register')
        .get(users.renderLogin )
        .post(catchAsync(users.register))

router.route('/login')
        .get(users.renderLogin)
        .post(storeReturnTo,passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}),users.login )

router.get('/logout',users.logout ); 

module.exports = router;
// router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
//     req.flash('success', 'welcome back!');
//     const redirectUrl = req.session.returnTo || '/campgrounds';
//     delete req.session.returnTo;
//     res.redirect(redirectUrl);
// })

// router.get('/logout', (req, res) => {
//     req.logout();
//     req.flash('success', "Goodbye!");
//     res.redirect('/campgrounds');
// })
