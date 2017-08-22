# Front Coding Challenge
You are part of a frontend engineering team at Front tasked with building an analytics dashboard using Javascript to present the following information about Front's customers:
## Prerequisites
- Node.js

## Installation
1. Open new terminal window
2. `cd ./front-coding-challenge`
3. `npm install` - install dependencies
4. `npm run server` - start server
5. In a new window `npm run start`
6. View in your browser at http://localhost:3000/

## Requirements
- [x] Top 5 of the most active companies in the last N months (N = 1 through 6). We measure how active a company is by their number of conversations.
	1. **Assumptions:** Number of conversations was calculated only when a user from a company initiated a conversation. I chose to calculate this because a user could be sent thousdands of emails! But this doesn't mean they are active.	
- [x] Top 5 of the most active users per company for these companies.
- [x] Top 5 pairs of work buddies. We should look at which pair of users talk the most to each other. Be sure to look at both To & Bcc fields.
	1. **Assumptions:** Any two users who sent messages to each other or bcc'd each other regardless of the Subject line. There were no two emails in the conversations with the same subject line. With real world data, there would be emails with the same subject and people replying back and forth, which would have allowed me to truly find out who the most active pairs were.
- [x] Percent of inactive users per company in the last N months (N = 1 through 6). An inactive user is a user who has not initiated any conversation in that time period.
- [x] Total number of conversations sent per month.
	1. I calculated and displayed the total calculations per N months and 
Your data team has made available a JSON API endpoint that returns data as in conversations.json.

## Challenges
The most difficult challenge was the data analysis and understanding. In my './utils.js' folders is where the data calculated is. Furthermore, before doing any calculations, I had to take some time to establish a 'conversation' and how to handle the one to many relationships in emails.


## Features
- Data sent through a Node Server

## Libraries used and why I chose them
- **React** 
    - I used create-react-app in order to kick start the project and begin the development project fast. I have worked recently with React.

## Folder Directory Guideline
- All of my work is in the `src` folder
* **_/src_**
   
   - **_/components_** _In the root of this folder are the 3 main components that make up the UI_        
        + ButtonDropDown - list view
        + Dashboard - list component
        + Tabs - screen view after clicking on list item  
   + App.js - _Main component in the app_
   + index.js - _Entry point into the app_
    
## Todo
- Write tests




