import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Search from './components/search/Search';
import Detail from './components/detail/Detail';

import './index.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    render() {
        
        return (
            <Router>
                <div>
                    <Route path='/' component={Search} />
                    <Route exact path='/items/:productId' component={Detail} />
                </div>
            </Router>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
