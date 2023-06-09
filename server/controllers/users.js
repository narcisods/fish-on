import User from '../models/User.js';

/* READ */
export const getUser = async (req, res) => {
	try {
		const { id } = req.params;
		const user = await User.findById(id);
		res.status(200).json(user);
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
};

export const getUserCrew = async (req, res) => {
	try {
		const { id } = req.params;
		const user = await User.findById(id);

		const crew = await Promise.all(user.crew.map((id) => User.findById(id)));
		const formattedCrew = crew.map(
			({
				_id,
				firstName,
				lastName,
				occupation,
				location,
				experience,
				picturePath,
			}) => {
				return {
					_id,
					firstName,
					lastName,
					occupation,
					location,
					experience,
					picturePath,
				};
			}
		);
		res.status(200).json(formattedCrew);
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
};

/* UPDATE */
export const addRemoveCrewMember = async (req, res) => {
	try {
		const { id, crewMemberId } = req.params;
		const user = await User.findById(id);
		const crewMember = await User.findById(crewMemberId);
		if (user.crew.includes(crewMemberId)) {
			user.crew = user.crew.filter((id) => id !== crewMemberId);
			crewMember.crew = crewMember.crew.filter(
				(crewMember) => crewMember !== id
			);
		} else {
			user.crew.push(crewMemberId);
			crewMember.crew.push(id);
		}
		await user.save();
		await crewMember.save();

		const crew = await Promise.all(user.crew.map((id) => User.findById(id)));
		const formattedCrew = crew.map(
			({
				_id,
				firstName,
				lastName,
				occupation,
				location,
				experience,
				picturePath,
			}) => {
				return {
					_id,
					firstName,
					lastName,
					occupation,
					location,
					experience,
					picturePath,
				};
			}
		);

		res.status(200).json(formattedCrew);
	} catch (err) {
		res.status(404).json({ message: 'err.message' });
	}
};
