import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import MainRouter from './routes';

import history from './routes/history';
import { Provider } from 'react-redux';
import store from './store';

import './index.css';
import 'react-toastify/dist/ReactToastify.css';

// eslint-disable-next-line react/no-render-return-value
const render = Router => ReactDOM.render(
    <AppContainer>
        <Provider store={store}>
            <Router history={history} />
        </Provider>
    </AppContainer>,
    document.getElementById('root')
);

render(MainRouter);

// Webpack Hot Module Replacement API
if (module.hot) {
    module.hot.accept('./routes', () => {
        render(MainRouter);
    });
}
