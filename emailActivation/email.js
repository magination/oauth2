var nodemailer = require('nodemailer');
var mailer = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 465,
	secure: true, // use SSL
	auth: {
		user: 'maginationgame@gmail.com',
		pass: process.env.MAIL_PASSWORD
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
		html: 'Thanks for registering to the Magination community!<br /><br />Follow this link to activate your account: ' + message + '<br /><br />Best regards,<br />The Magination team',
		text: 'Thanks for registering to the Magination community!\n\nFollow this link to activate your account: ' + message + '\n\nBest regards,\nThe Magination team'
	});
};
