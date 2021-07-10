const User = require('../models/user-model');

createUser = (req, res) => {
	const body = req.body;
	// console.log('----------------------- createUser: req -----------------------')
	// console.log(req);
	// console.log('----------------------- createUser: body -----------------------')
	// console.log(body);

	if (!body) {
		return res.status(400).json({
			success: false,
			error: 'You must provide an User.'
		});
	}

	const user = new User(body);

	if (!user) {
		console.error(`[Hack.Diversity React Template] - 400 in 'createUser': 'user' is malformed.`);
		return res.status(400).json({
			success: false,
			message: "'user' is malformed"
		});
	}

	// console.log('----------------------- createUser: User -----------------------')
	// console.log(User)

	return user
		.save()
		.then(() => {
			console.error(`[Hack.Diversity React Template] - 201 in 'createUser': User created!`);
			return res.status(201).json({
				success: true,
				id: user._id,
				message: 'user created!'
			});
		})
		.catch((err) => {
			console.error(`[Hack.Diversity React Template] - caught error in 'createUser': ${err.errors.name}`);
			// Object.keys(err.errors).forEach((errorKey) => {
			// 	console.error(`ERROR for: ${errorKey}`);
			// 	console.error(`=> ${((err.errors[errorKey] || {}).properties || {}).message}`);
			// });
			return res.status(400).json({
				success: false,
				error: err,
				message: err
			});
		});
};


userBorrow = async (req, res) => {
	const body = req.body;
	// console.log('----------------------- createUser: req -----------------------')
	// console.log(req);
	// console.log('----------------------- createUser: body -----------------------')
	// console.log(body);

	if (!body.lib_Id) {
		return res.status(400).json({
			success: false,
			error: 'You must provide an library ID.'
		});
  }
  await User.find({ lib_Id: body.lib_Id }, (err, users) => {
		if (err) {
			console.error(`[Hack.Diversity React Template] - 400 in 'userBorrow': ${err}`);
			throw res.status(400).json({
				success: false,
				error: err
			});
		}
		if (!users.length) {
			console.error(`[Hack.Diversity React Template] - 404 in 'userBorrow': User not found`);
			return res.status(404).json({
				success: false,
				error: 'User not found'
			});
    }
    











		console.log(`[Hack.Diversity React Template] - 200 in 'userBorrow': Book fetched!`);
		return res.status(200).json({
			success: true,
			book: books[0]
		});
	}).catch((err) => {
		console.error(`[Hack.Diversity React Template] - caught error in 'userBorrow': ${err}`);
		console.error(err);
		return err;
	});








	

	// console.log('----------------------- createUser: User -----------------------')
	// console.log(User)

	return user
		.save()
		.then(() => {
			console.error(`[Hack.Diversity React Template] - 201 in 'createUser': User created!`);
			return res.status(201).json({
				success: true,
				id: user._id,
				message: 'user created!'
			});
		})
		.catch((err) => {
			console.error(`[Hack.Diversity React Template] - caught error in 'createUser': ${err.errors.name}`);
			// Object.keys(err.errors).forEach((errorKey) => {
			// 	console.error(`ERROR for: ${errorKey}`);
			// 	console.error(`=> ${((err.errors[errorKey] || {}).properties || {}).message}`);
			// });
			return res.status(400).json({
				success: false,
				error: err,
				message: err
			});
		});
};
