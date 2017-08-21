/*
	appData: Used to display calculations and be send to the UI
	data: This object is strictly used for calculations throught
	userMap: I created this in order find user information by email. 
		This isn't very necessary so I would probably refactor if given more time		
*/
const appData = {
	sortedCompaniesByMonth: new Array(12).fill([]),
	totalConversationsPerMonth: new Array(14).fill(0),
	topWorkBuddies: null,	
} 
const data = {}, companies = {}, userMap = {};

/*
	This function is used in componentDidMount. When the data/json file is 
	received from the Node server, I pass the conversations through this 
	function in order to calculate all the data necessary. 
*/
export const createDataStore = (conversations) => {
	let company;
	for (let i = 0; i < conversations.companies.length; i++) {
		company = conversations.companies[i];
		companies[company.id] = company.name;
		data[company.id] = {
			users: {},
			company_name: company.name,
			activityPerNMonth: new Array(14).fill(0),
			activityOfLastNMonths: new Array(14).fill(0),
			inActivityOfLastNMonths: new Array(14).fill(0),				
			activeUsers: 0,		
			totalUsers: 0,	
		};
	}
	createUserMap(conversations);
	calculateTopCompanies();

	for (let j = 0; j < conversations.conversations.length; j++) {
		let conversation = conversations.conversations[j];			
		let fromUser = conversation.from; // only gets from user, probably needs to user to increment also
		let timeSent = conversation.date;
		const company_id = userMap[fromUser].company_id;
		let fullName = userMap[fromUser].name.first + ' ' + userMap[fromUser].name.last;
		let whichMonth = incrementMonthlyActivityForCompany(timeSent, company_id);		

		if (!data[company_id].users[fullName]) {
			data[company_id].users[fullName] = {
				totalNumberSent: 1,
				emailsSentByMonth: new Array(14).fill(0),
				emailsSentLastNMonths: new Array(14).fill(0),
				email: conversation.from,
			};
		} else {
			data[company_id].users[fullName].totalNumberSent += 1;
			data[company_id].users[fullName].emailsSentByMonth[whichMonth] += 1;
			for (let i = whichMonth; i < data[company_id].users[fullName].emailsSentLastNMonths.length; i++) {
				data[company_id].users[fullName].emailsSentLastNMonths[i] += 1;
			}
		}
	}	
	const emailGraph = createGraph(conversations);
	const topWorkBuddies = calculateTopWorkBuddies(emailGraph);
	appData.topWorkBuddies = topWorkBuddies;
	return appData;
}

const topCompaniesSortedByLastNMonths = (n) => {
	let sortable = [];
	for (var key in data) {
    sortable.push(data[key]);
	}
	return sortable.sort((companyA, companyB) => {
		return companyB.activityOfLastNMonths[n] -  companyA.activityOfLastNMonths[n]
	})
}
const calculateTopCompanies = () => {
	for (let month = 5; month < 13; month++) {
		appData.sortedCompaniesByMonth[month] = topCompaniesSortedByLastNMonths(month); // array
	}
};
const createUserMap = (conversations) => {
	for (let i = 0; i < conversations.users.length; i++) {
		let user = conversations.users[i];
		userMap[user.email] = {
			company_id: user.company_id,
			name: user.name
		}
	}
}
const monthsAgo = (n) => {
	const timeNow = Date.now();
	return timeNow - (n * (2.682 * 1000000000));
}

/*
	This function is used in order to calculating last N months
	If a user sent an email in 2 months ago, then, that email should
	also be included when accountint for emails in the last 10 months.
*/
const incrementAllSubsequentMonths = (month, company_id) => {
	for (let i = month; i < data[company_id].activityOfLastNMonths.length; i++) {
		data[company_id].activityOfLastNMonths[i]++;
	}
}
const incrementMonthlyActivityForCompany = (timeSent, company_id) => {
		if (timeSent > monthsAgo(1)) { 
			data[company_id].activityPerNMonth[1]++; 
		} else if (timeSent < monthsAgo(1) && timeSent > monthsAgo(2)) {
		} else if (timeSent < monthsAgo(2) && timeSent > monthsAgo(3)) {
		} else if (timeSent < monthsAgo(3) && timeSent > monthsAgo(4)) {
		} else if (timeSent > monthsAgo(5)) {
			incrementAllSubsequentMonths(5, company_id);
			data[company_id].activityPerNMonth[5]++;			
			appData.totalConversationsPerMonth[5]++;							
			return 5;	
		} else if (timeSent < monthsAgo(5) && timeSent > monthsAgo(6)) {
			incrementAllSubsequentMonths(6, company_id)
			data[company_id].activityPerNMonth[6]++;
			appData.totalConversationsPerMonth[6]++;				
			return 6;	
		} else if (timeSent < monthsAgo(6) && timeSent > monthsAgo(7)) {
			incrementAllSubsequentMonths(7, company_id);
			data[company_id].activityPerNMonth[7]++;
			appData.totalConversationsPerMonth[7]++;
			return 7;				
		} else if (timeSent < monthsAgo(7) && timeSent > monthsAgo(8)) {
			incrementAllSubsequentMonths(8, company_id)
			data[company_id].activityPerNMonth[8]++;
			appData.totalConversationsPerMonth[8]++;				
			return 8;				
		} else if (timeSent < monthsAgo(8) && timeSent > monthsAgo(9)) {
			incrementAllSubsequentMonths(9, company_id)
			data[company_id].activityPerNMonth[9]++;
			appData.totalConversationsPerMonth[9]++;													
			return 9;				
		} else if (timeSent < monthsAgo(9) && timeSent > monthsAgo(10)) {
			incrementAllSubsequentMonths(10, company_id)
			data[company_id].activityPerNMonth[10]++;
			appData.totalConversationsPerMonth[10]++;																	
			return 10;				
		} else if (timeSent < monthsAgo(10) && timeSent > monthsAgo(11)) {
			incrementAllSubsequentMonths(11, company_id)
			data[company_id].activityPerNMonth[11]++;
			appData.totalConversationsPerMonth[11]++;																	
			return 11;				
		} else if (timeSent < monthsAgo(11) && timeSent > monthsAgo(12)) {
			incrementAllSubsequentMonths(12, company_id)
			data[company_id].activityPerNMonth[12]++;
			appData.totalConversationsPerMonth[12]++;	
			return 12;															
		}
}



/*
	These two functions are used to calculate the top relationships in the dataset
	Currently, I only find the total top work buddies, if I had more time, I would 
	calculate the top work buddies by time.
*/

const createGraph = (conversations) => {
	const emailGraph = {};
	for (let i = 0; i < conversations.conversations.length; i++) {
		let conversation = conversations.conversations[i];
		const {from, bcc, date, to} = conversation;

		if (!emailGraph[from]) {
			emailGraph[from] = {};
		} else {
			for (let i = 0; i < to.length; i++) {
				let toUser = to[i];
				if (emailGraph[from] && emailGraph[from][toUser]) {
					emailGraph[from][toUser].count++;
				} else if (!emailGraph[from][toUser]) {
					emailGraph[from][toUser] = {count: 1, date};
				} else {
					emailGraph[from][toUser][0]++;
				}
			}
			for (let j = 0; j < bcc.length; j++) {
				let bccUser = bcc[j];
				if (emailGraph[from] && emailGraph[from][bccUser]) {
					emailGraph[from][bccUser].count += 1;
				} else if (!emailGraph[from][bccUser]) {
					emailGraph[from][bccUser] = {count: 1, date};
				} else {
					emailGraph[from][bccUser].count += 1;
				}
			}
		}
	}
	return emailGraph;
};

const calculateTopWorkBuddies = (emailGraph) => {
	const pairs = {};
	for (var sender in emailGraph) {
		let recipients = emailGraph[sender];
		for (var recipient in recipients) {
			/*
				See if there has ever been a converstaion between two people, if there has been, then increment
				their converstaions by 1, otherwise assign to one
			*/
			let keyForTwoWorkBuddies = recipient + ' ' + sender; 
			let _keyForTwoWorkBuddies = sender + ' ' + recipient;
			
			if (pairs[_keyForTwoWorkBuddies]) {
				pairs[_keyForTwoWorkBuddies] += emailGraph[recipient][sender].count;				
			} else if (emailGraph[recipient][sender] && !pairs[keyForTwoWorkBuddies] && !pairs[_keyForTwoWorkBuddies]) {
				pairs[keyForTwoWorkBuddies] = emailGraph[recipient][sender].count;
			} else if (pairs[_keyForTwoWorkBuddies]) {
				pairs[_keyForTwoWorkBuddies] += emailGraph[recipient][sender].count;
			} 
		}
	}
	let topFivePairs = Object.keys(pairs).sort((a, b) => {
		return pairs[b] - pairs[a]
	}).slice(0, 5);
	topFivePairs = topFivePairs.map((stringPair) => {
		let pair = stringPair.split(' ');
		let pairOneEmail = {email: pair[0]};
		let pairTwoEmail = {email: pair[1]};
		return [
			{
				 ...pairOneEmail,
				...userMap[pair[0]]
			}, 
			{	
				...pairTwoEmail,
				...userMap[pair[1]]
			}
		]
	})
	return topFivePairs;
}

appData.createDataStore = createDataStore;
export {appData};