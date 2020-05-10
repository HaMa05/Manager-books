const cloudinary = require('cloudinary').v2;
const db = require('../db');

module.exports.profile = (req, res) => {
	var cookieId = req.signedCookies.cookieId;
	var user = db.get("users").find({id: cookieId}).value();

	res.render("profile/profile.pug", {
		user: user
	})
}

module.exports.updateProfile = (req, res) => {
	var cookieId = req.signedCookies.cookieId;
	var user = db.get("users").find({id: cookieId}).value();

	res.render("profile/updateProfile.pug", {
		user: user
	})
}

module.exports.postProfile = async (req, res) => {
	var cookieId = req.signedCookies.cookieId;
	var link_avatar = req.file.path;
	// upload file len cloudinary
	await cloudinary.uploader.upload(link_avatar,
		{
			folder: "/avatarUrl",
			public_id: "image"
		},
		(error, result) => {
		console.log(result.secure_url);
		db.get("users")
			.find({id: cookieId})
			.assign({avatar: result.secure_url})
			.write()
	});

	res.redirect('/profile');
}