import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit'

import App from './App';
import auth from './store/reducers/auth';
import pointsMachine from './store/reducers/pointsMachine';
import sensor from './store/reducers/sensor';
// import reportWebVitals from './reportWebVitals';

const store = configureStore({
    reducer: {
        auth: auth,
        pointsMachine: pointsMachine,
        sensor: sensor
    }
});

const app = (
    <Provider store={ store }>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

const root = createRoot(document.getElementById('root'));
root.render(app);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
