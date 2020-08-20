var Campground = require('../models/campground');
var Comment = require('../models/comment');

var middlewareObj = {};

middlewareObj.isLoggedIn=function (req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash('error','Need to be logged in');
	res.redirect('/login');
}

middlewareObj.checkCampgroundOwnership=function (req, res, next){
	if(req.isAuthenticated){
		Campground.findById(req.params.id, function(err, foundCampground){
		if(err){
			req.flash('error','404');
			res.redirect('back');
		}else{
			if(foundCampground.author.id.equals(req.user._id)){
				next();
			}else{
				req.flash('error','Permission Denied!');
				res.redirect('back');
			}
		}
	});
	}else{
		req.flash('error','Please login');
		res.redirect('back');
	}	
}

middlewareObj.checkCommentOwnership=function (req, res, next){
	if(req.isAuthenticated){
		Comment.findById(req.params.comment_id, function(err, foundComment){
		if(err){
			req.flash('error','404');
			res.redirect('back');
		}else{
			if(foundComment.author.id.equals(req.user._id)){
				next();
			}else{
				req.flash('error','Permission Denied!');
				res.redirect('back');
			}
		}
	});
	}else{
		req.flash('error','Please login');
		res.redirect('back');
	}	
}

module.exports = middlewareObj;