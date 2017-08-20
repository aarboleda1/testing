import React, { Component } from 'react';
import { Button, ButtonGroup, Dropdown, DropdownButton, MenuItem, PageHeader, Jumbotron } from 'react-bootstrap';
import Tabs from './components/Tabs';
import logo from './logo.svg';
import CompanyList from './components/CompanyList';
import ButtonDropDown from './components/ButtonDropDown';
import './analyzeData';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentMonth: props.data.appData.sortedCompaniesByMonth[5]
		}
		this.monthMapper = {
			5: props.data.appData.topFiveInLastFiveMonths,
			6: props.data.appData.topFiveInLastSixMonths,
			7: props.data.appData.topFiveInLastSevenMonths,
			8: props.data.appData.topFiveInLastEightMonths,
			9: props.data.appData.topFiveInLastNineMonths,
			10: props.data.appData.topFiveInLastTenMonths,
			11: props.data.appData.topFiveInLastElevenMonths,
			12: props.data.appData.topFiveInLastTwelveMonths,
		}
	}
	onSelectMonth = (lastNumberOfMonths) => {
		this.setState({
			currentMonth: this.props.data.appData.sortedCompaniesByMonth[lastNumberOfMonths]
		})
	}
	componentDidMount = () => {
		console.log(this.props)
	}
  render() {
		const {data} = this.props
    return (
      <div className="app-container">
				<div className="fa-sidebar-container"/>
				<div className="fa-header">
					<h4>Front Analytics Dashboard</h4>
				</div>
				<div className="fa-main-container">
					<ButtonDropDown
						onSelectMonth={this.onSelectMonth}
					/>
					<CompanyList
						lastNumberOfMonths={this.state.currentMonth}
					/>									
				</div>

      </div>
    );
  }
}

export default App;
