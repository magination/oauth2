var nodemailer = require('nodemailer');

var mailer = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 465,
	secure: true, // use SSL
	auth: {
		user: 'maginationgame@gmail.com',
		pass: 'Attraction777'
	}
});

mailer.verify(function (error, success) {
	if (error) {
		console.log(error);
	} else {
		console.log('Connected to email server');
	}
});

module.exports = function(email, subject, message){
	return mailer.sendMail({
		to: email,
		from: 'maginationtest@gmail.com',
		subject: subject,
		html: message,
		text: message
	});
};
