import React from "react"
import ReactDOM from "react-dom"
import App from "./components/app"
import environmentConfig from "./environmentConfig";

import { createStore, applyMiddleware } from 'redux'
import thunk from "redux-thunk";
import rootReducer from './rootReducer'
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";



const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
);

ReactDOM.render(
    <BrowserRouter basename={environmentConfig.appPrefix}>
        <Provider store={store}>  
        <App />        
        </Provider>
    </BrowserRouter>,
    document.getElementById('root')
);


