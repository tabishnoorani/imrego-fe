import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import {Provider} from 'react-redux';
import Store from './store';

const Root = <Provider store={Store}>
                    <App/>
                </Provider>

ReactDOM.render(Root, document.getElementById('root'));
registerServiceWorker();
