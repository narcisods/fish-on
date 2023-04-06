import { PersonAddOutlined, PersonRemoveOutlined } from '@mui/icons-material';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCrew } from 'state';
import FlexBetween from './FlexBetween';
import UserImage from './UserImage';

const CrewMember = ({ crewMemberId, name, subtitle, userPicturePath }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { _id } = useSelector((state) => state.user);
	const token = useSelector((state) => state.token);
	const crew = useSelector((state) => state.user.crew);

	const { palette } = useTheme();
	const primaryLight = palette.primary.light;
	const primaryDark = palette.primary.dark;
	const main = palette.neutral.main;
	const medium = palette.neutral.medium;

	const isCrewMember = Object.values(crew).find(
		(crewMember) => crewMember._id === crewMemberId
	);

	const patchCrewMember = async () => {
		const response = await fetch(
			`http://localhost:3001/users/${_id}/${crewMemberId}`,
			{
				method: 'PATCH',
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
			}
		);
		const data = await response.json();
		dispatch(setCrew({ crew: data }));
	};

	return (
		<FlexBetween>
			<FlexBetween gap="1rem">
				<UserImage image={userPicturePath} size="55px" />
				<Box
					onClick={() => {
						navigate(`/profile/${crewMemberId}`);
						navigate(0);
					}}
				>
					<Typography
						color={main}
						variant="h5"
						fontWeight="500"
						sx={{
							'&:hover': {
								color: palette.primary.light,
								cursor: 'pointer',
							},
						}}
					>
						{name}
					</Typography>
					<Typography color={medium} fontSize="0.75rem">
						{subtitle}
					</Typography>
				</Box>
			</FlexBetween>
			{_id === crewMemberId || (
				<IconButton
					onClick={() => patchCrewMember()}
					sx={{ backgroundColor: primaryLight, p: '0.6rem' }}
				>
					{isCrewMember ? (
						<PersonRemoveOutlined sx={{ color: primaryDark }} />
					) : (
						<PersonAddOutlined sx={{ color: primaryDark }} />
					)}
				</IconButton>
			)}
		</FlexBetween>
	);
};

export default CrewMember;
