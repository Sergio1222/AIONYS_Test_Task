import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import Notes from './components/Note/Notes'

import './custom.css'

export default () => (
        <main>
            <Switch>
                <Route path="/" component={Notes}/>
            </Switch>
        </main>
);
