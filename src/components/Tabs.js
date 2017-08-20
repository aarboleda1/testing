import React,{Component} from 'react';
import {Tab, Row, Col, Nav, NavItem} from 'react-bootstrap';
const numMonths = [5, 6, 7, 8, 9, 10, 11];

export default class Tabs extends Component{
	renderTabs = () => {
		return numMonths.map((numMonths) => {
			return (
				<NavItem key={numMonths} eventKey={`last-${numMonths}-months`}>
					Last {numMonths} Months
				</NavItem>
			)
		})
	}	
	render(){
		return(
			<div className="fa-tabs-container">
				<Tab.Container id="tabs-with-dropdown" defaultActiveKey="first">
					<Row className="clearfix">
						<Col sm={12}>
							<Nav bsStyle="tabs">
								{this.renderTabs()}
							</Nav>
						</Col>
					</Row>
				</Tab.Container>
			</div>		
		)
	}
}