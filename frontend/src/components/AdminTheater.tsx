import React from 'react'
import {
	Typography,
	Grid,
	Link,
} from "@material-ui/core"
import { Field, InjectedFormProps, reduxForm } from 'redux-form'


type AdminTheaterProps = {
	handleSubmit: () => void;
	name: string;
	street: string;
	kietz: string;
	telephone: string;
	website: string;
	originalID: string;
}

const AdminTheater: React.FC<AdminTheaterProps & InjectedFormProps<{}, AdminTheaterProps>> = (props: any) => {
  const {
	handleSubmit,
	name,
	street,
	website,
	originalID
  } = props;

	let istheaterReviewd = (street && website) ? true : false;

	return (
		<Grid item sm={6}
			className={"editDetails " + (istheaterReviewd ? "reviewed" : "")}
		>
			<Typography variant="h5">{name}</Typography>
			<form onSubmit={handleSubmit}>
				<Grid container justify="space-between" alignItems="flex-start">
					<Grid item xs={6} className="details">
						<span className="type col-xs-6">street </span>
						<Field
							name="street"
							component="input"
							type="text"
							value={street}
						/>
					</Grid>
					<Grid item xs={6} className="details">
						<span className="type col-xs-4">kietz</span>
						<Field
							name="kietz"
							component="input"
							type="text"
						/>
					</Grid>
				</Grid>
				<Grid container justify="space-between" alignItems="flex-start">
					<Grid item xs={6} className="details">
						<span className="type">telephone</span>
						<Field
							name="telephone"
							component="input"
							type="text"
						/>
					</Grid>
					<Grid item xs={6} className="details">
						<span className="type col-xs-4">website</span>
						<Field
							name="website"
							component="input"
							type="text"
						/>
					</Grid>
					<Link
						href={originalID} target="_blank"
						underline="hover"
						rel="noopener noreferrer">
						Original Data
					</Link>
				</Grid>
				<button type="submit">Submit</button>
			</form>
		</Grid>
	);
}

export default reduxForm<{}, AdminTheaterProps>({
  form: 'AdminTheater',
})(AdminTheater);
