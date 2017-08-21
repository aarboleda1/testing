import React from 'react';
import {Tab, Row, Col, Nav, NavItem} from 'react-bootstrap';
const numMonths = [5, 6, 7, 8, 9, 10, 11];

export const Tabs = () => {
	const renderTabs = () => {
		return numMonths.map((numMonths) => {
			return (
				<NavItem key={numMonths} eventKey={`last-${numMonths}-months`}>
					Last {numMonths} Months
				</NavItem>
			)
		})
	}		
	return (
		<div className="fa-tabs-container">
			<Tab.Container id="tabs-with-dropdown" defaultActiveKey="first">
				<Row className="clearfix">
					<Col sm={12}>
						<Nav bsStyle="tabs">
							{renderTabs()}
						</Nav>
					</Col>
				</Row>
			</Tab.Container>
		</div>		
	)
}