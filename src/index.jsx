import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import SearchBar from './components/search/SearchBar';
import Result from './components/result/Result';
import Detail from './components/detail/Detail';
import Breadcrumb from './components/breadcrumb/Breadcrumb'
import Spinner from './components/spinner/Spinner'


import './index.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            breadItems: []
        }
    }

    changeBreadCrum(items){
        this.setState({
            breadItems : items
        })
    }

    changeLoadState(loading){
        this.setState({
            loading : loading
        })
    }


    render() {
        return (
            <div>
                <Router>
                    <Route path='/' render={(props) => 
                        <SearchBar 
                            changeItems={this.changeBreadCrum.bind(this)} {...props}/>}/>
                    <Spinner show={this.state.loading} />
                    <Breadcrumb>
                        {this.state.breadItems.map(({ to, label }) => (
                            <Link key={to} to={to}>
                            {label}
                            </Link>
                        ))}
                    </Breadcrumb>    
                    <Route exact path='/items' render={(props) => 
                        <Result 
                            loading={this.changeLoadState.bind(this)} 
                            changeItems={this.changeBreadCrum.bind(this)} {...props}/>}/>
                    <Route exact path='/items/:productId' render={(props) => 
                        <Detail 
                            loading={this.changeLoadState.bind(this)} {...props}/>}/>
                </Router>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));