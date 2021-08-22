import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Loader from './util/Loader.js';

const NativeDatePickerContainer = lazy(() => import('./Inputs/NativeDatePickerContainer.js'));
const Main = lazy(() => import('./Main.js'));

const style = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 24,
    marginBottom: 20,
};

ReactDOM.render(
    <div>
        <Router>
            <Suspense fallback={<Loader />} >
                <div>
                    <nav className="mui-appbar" style={style}> 
                        Demo
                    </nav>
                    <main className='mui-container'>
                        <Switch>
                            <Route exact path="/date" component={NativeDatePickerContainer} />
                            <Route path="/" component={Main} />
                        </Switch>
                    </main>
                </div>
            </Suspense>
        </Router>
    </div>,
    document.getElementById('root')
);

