import { combineReducers } from 'redux'
import loadingReducer from './loading.reducer';
import notifyReducer from './notify.reducer';
import alertReducer from './alert.reducer';
import authReducer from './auth.reducer';
import registerReducer from './register.reducer';
import vehiclesReducer from './vehicles.reducer';
import navigationReducer from './navigation.reducer';
import notesReducer from './notes.reducer';
import ownersReducer from './owners.reducer';
import appReducer from './app.reducer';
import unitsReducer from './units.reducer';
import payReducer from './pay.reducer';
import transactionsReducer from './transactions.reducer';

const rootReducer = combineReducers({
    loadingReducer,
    notifyReducer,
    alertReducer,
    authReducer,
    registerReducer,
    vehiclesReducer,
    navigationReducer,
    notesReducer,
    ownersReducer,
    appReducer,
    unitsReducer,
    payReducer,
    transactionsReducer
});

export default rootReducer;