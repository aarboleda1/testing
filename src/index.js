import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './stylesheets/App.css';
import registerServiceWorker from './registerServiceWorker';
import * as data from './utils';
ReactDOM.render(<App data={data}/>, document.getElementById('root'));
registerServiceWorker();
