import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import FHIR from 'fhirclient';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
const ehrClientID = process.env.REACT_APP_EHR_CLIENT_ID
const ehrClientSecret = process.env.REACT_APP_EHR_CLIENT_SECRET

const smartFhirLaunch = () => {
  console.log("REACT_APP_EHR_CLIENT_ID: ", ehrClientID, " REACT_APP_EHR_CLIENT_SECRET: ", ehrClientSecret, " Running!");
  FHIR.oauth2.init({
    clientId: ehrClientID,
    clientSecret: ehrClientSecret,
    scope: 'launch patient/Patient.read user/Patient.read user/Questionnaire.read patient/QuestionnaireResponse.* openid profile online_access',
  })
  .then(client => {
    root.render(
      <React.StrictMode>
        <Router>
          <App client={client} />
        </Router>
      </React.StrictMode>
    );
  })
};

smartFhirLaunch();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
