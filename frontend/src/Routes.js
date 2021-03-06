import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';

const Auth = lazy(() => import('./view/auth'));
const Register = lazy(() => import('./view/register'));
const Vehicles = lazy(() => import('./view/vehicles'));
const VehicleEdit = lazy(() => import('./view/vehicles/edit'));
const Pay = lazy(() => import('./view/pay'));
const Transactions = lazy(() => import('./view/transactions'));
const TransactionShow = lazy(() => import('./view/transactions/show'));

const Routes = () => (
    <Router>
        <Suspense fallback={<div className="d-flex justify-content-center mt-5 pt-5"> <CircularProgress /> </div>}>
            <Switch>
                <Route exact path="/vehicles" component={Vehicles} /> 
                <Route exact path="/vehicles/create" component={VehicleEdit} /> 
                <Route exact path="/vehicles/:id/edit" component={VehicleEdit} /> 
                <Route exact path="/pay" component={Pay} /> 
                <Route exact path="/transactions/:id" component={TransactionShow} /> 
                <Route exact path="/transactions" component={Transactions} />                 
                <Route exact path="/register" component={Register} /> 
                <Route exact path="/login" component={Auth} /> 
                <Route exact path="/" component={Auth} />                                
            </Switch>
        </Suspense>
    </Router>
)

export default Routes;