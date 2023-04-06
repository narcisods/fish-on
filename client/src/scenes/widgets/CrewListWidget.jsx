import { Box, Typography, useTheme } from '@mui/material';
import CrewMember from 'components/Crew';
import WidgetWrapper from 'components/WidgetWrapper';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCrew } from 'state';

const CrewListWidget = ({ userId }) => {
	const dispatch = useDispatch();
	const { palette } = useTheme();
	const token = useSelector((state) => state.token);
	const crew = useSelector((state) => state.user.crew);

	const getCrew = async () => {
		const response = await fetch(`http://localhost:3001/users/${userId}/crew`, {
			method: 'GET',
			headers: { Authorization: `Bearer ${token}` },
		});
		const data = await response.json();
		dispatch(setCrew({ crew: data }));
	};

	useEffect(() => {
		getCrew();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<WidgetWrapper>
			<Typography
				color={palette.neutral.dark}
				variant="h5"
				fontWeight="500"
				sx={{ mb: '1.5rem' }}
			>
				Crew
			</Typography>
			<Box display="flex" flexDirection="column" gap="1.5rem">
				{crew.length &&
					crew.map((crewMember) => (
						<CrewMember
							key={crewMember._id}
							crewMemberId={crewMember._id}
							name={`${crewMember.firstName} ${crewMember.lastName}`}
							subtitle={crewMember.location}
							userPicturePath={crewMember.picturePath}
						/>
					))}
			</Box>
		</WidgetWrapper>
	);
};

export default CrewListWidget;
