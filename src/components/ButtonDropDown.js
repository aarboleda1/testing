import React from 'react';
import { ButtonGroup, DropdownButton, MenuItem } from 'react-bootstrap';
const months = [5, 6, 7, 8, 9, 10];

const ButtonDropDown = (props) => {
	const renderButtonChoices = () => {
		return months.map((month) => {
			return <MenuItem key={month} eventKey={month}>{month} months</MenuItem>
		})
	}
	return (
		<ButtonGroup>
			<DropdownButton onSelect={(lastNumberOfMonths) => props.onSelectMonth(lastNumberOfMonths)} title={`Last ${props.selectedMonth} Months`} id="bg-nested-dropdown">
				{renderButtonChoices()}
			</DropdownButton>
		</ButtonGroup>	
	)
}
export default ButtonDropDown;