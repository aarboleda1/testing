import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './App.css';
import registerServiceWorker from './registerServiceWorker';
import * as data from './analyzeData';
ReactDOM.render(<App data={data}/>, document.getElementById('root'));
registerServiceWorker();
