import React from 'react';
import ReactDOM from 'react-dom';
// import { BrowserRouter as Router } from 'react-router-dom'
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux';
import Store, {history} from './store';


const Root = (props) =>{
    return(
    <Provider store={Store}>
        <ConnectedRouter history={history}>
                <App/>
        </ConnectedRouter>
    </Provider>
)}

ReactDOM.render(<Root/>, document.getElementById('root'));
registerServiceWorker();
