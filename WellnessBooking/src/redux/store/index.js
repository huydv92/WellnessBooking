import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from '../reducers';
import sagas from '../sagas';
import logger from 'redux-logger';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    reducers,
    {},
    applyMiddleware(sagaMiddleware,logger),
);

sagaMiddleware.run(sagas);
export default store;