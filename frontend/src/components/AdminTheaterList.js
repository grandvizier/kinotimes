import React from 'react'
import PropTypes from 'prop-types'
import AdminTheater from './AdminTheater'
import { Grid } from '@material-ui/core'

const AdminTheaterList = ({ theaters, updateTheaterData }) => (
	<Grid container>
		<Grid container>
			{Object.keys(theaters).map(id => (
				<AdminTheater
					key={id}
					form={id}
					initialValues={theaters[id]}
					{...theaters[id]}
					onSubmit={values => {
						updateTheaterData(values)
					}}
					/>
			))}
		</Grid>
	</Grid>
)

AdminTheaterList.propTypes = {
	theaters: PropTypes.object.isRequired,
	updateTheaterData: PropTypes.func.isRequired
}

export default AdminTheaterList
