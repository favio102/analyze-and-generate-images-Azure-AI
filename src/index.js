import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';


const rootStyle = {
  backgroundColor: 'black', // Change to your desired background color
  height: '100vh', // Set height to fill the entire viewport if needed
  /* Add more styles as needed */
};

ReactDOM.render(<div style={rootStyle}><App /></div>, document.getElementById('root'));
