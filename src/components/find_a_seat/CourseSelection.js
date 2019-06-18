import React, { useState } from "react";
import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";

import { IsSmallContext } from "../../shared";

const useStyles = makeStyles(theme => ({
	root: {
		display: "flex",
		justifyContent: "center"
	},
	table: {
		width: "80%",
		minWidth: 500
	},
	card: {
		border: "2px solid #eeeeee",
		margin: `32px auto`,
		minWidth: 280
	}
}));

/**
 *
 * @param {{course: Object, handleBack: Function, subscribeToCourse: Function}} param0
 */
function CourseSelection({
	course: { courseData, courseIdentifier },
	subscribeToCourse
}) {
	const classes = useStyles();
	const isSmallDevice = React.useContext(IsSmallContext);
	const { faculty, course, year, semester } = courseIdentifier;

	const handleSubscribe = section => {
		subscribeToCourse({
			faculty,
			course,
			year,
			semester,
			section
		});
	};

	const BigViewport = () => (
		<React.Fragment>
			<Typography gutterBottom variant="h4">{`${courseData.subject}${
				courseData.course
			}`}</Typography>
			<div className={classes.root}>
				<Table className={classes.table}>
					<TableHead>
						<TableRow>
							<TableCell>Section</TableCell>
							<TableCell>Instructor(s)</TableCell>
							<TableCell>Location</TableCell>
							<TableCell>Days</TableCell>
							<TableCell>Time</TableCell>
							<TableCell>Subscribe</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{courseData.sections.map(section => (
							<TableRow key={section.section}>
								<TableCell>{section.section}</TableCell>
								<TableCell>{section.instructor}</TableCell>
								<TableCell>{section.location}</TableCell>
								<TableCell>{section.days}</TableCell>
								<TableCell>{section.time}</TableCell>
								<TableCell>
									<Button
										color="primary"
										onClick={() => handleSubscribe(section.section)}
									>
										Subscribe
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</React.Fragment>
	);

	const SmallViewport = () => (
		<React.Fragment>
			<Typography variant="h4">{`${courseData.subject}-${
				courseData.course
			}`}</Typography>
			{courseData.sections.map(section => {
				return (
					<div key={section.section}>
						<Card className={classes.card} elevation={0}>
							<CardHeader title={`Section ${section.section}`} />
							<CardContent>
								<Typography>Instructor(s): {section.instructor}</Typography>
								<Typography>Location: {section.location}</Typography>
								<Typography>Days: {section.days}</Typography>
								<Typography>Time: {section.time}</Typography>
							</CardContent>
							<CardActions>
								<Button
									color="primary"
									onClick={() => handleSubscribe(section.section)}
								>
									Subscribe
								</Button>
							</CardActions>
						</Card>
					</div>
				);
			})}
		</React.Fragment>
	);

	return isSmallDevice ? <SmallViewport /> : <BigViewport />;
}

CourseSelection.propTypes = {
	course: PropTypes.object.isRequired,
	handleBack: PropTypes.func.isRequired
};
export default CourseSelection;
