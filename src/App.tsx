import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Reserve from './pages/Reserve/Reserve';
import Status from './pages/Status/Status';
import Admin from './pages/Admin/Admin';

/**
 * The main application.
 * @returns A React element.
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
