import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Reserve from './pages/Reserve';
import Status from './pages/Status';
import Admin from './pages/Admin';

/**
 * The main application.
 */
function App(): React.ReactElement {
    return (
        <div className="app">
            <BrowserRouter>
                <Navbar />
                <Switch>
                    <Route exact path="/">
                        <Reserve />
                    </Route>
                    <Route path="/status">
                        <Status />
                    </Route>
                    <Route path="/admin">
                        <Admin />
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
