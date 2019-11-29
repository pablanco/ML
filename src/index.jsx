import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Breadcrumb, Detail, Result, Spinner, SearchBar } from './components'
import './index.css';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            breadItems: [{to: '/', label: 'Home'}]
        }
    }

    changeBreadCrum(items){
        if(items.length !== 0){
            items = this.state.breadItems.concat(items);
        }
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
                    <div className={ this.state.loading ?  'hidden' : 'visible' }>
                        <Breadcrumb>
                            {this.state.breadItems.map(({ to, label }) => (
                                <Link key={to} to={to}>
                                {label}
                                </Link>
                            ))}
                        </Breadcrumb> 
                    </div>   
                    <Route exact path='/items' render={(props) => 
                        <div className={ this.state.loading ?  'hidden' : 'visible' }>
                        <Result 
                            loading={this.changeLoadState.bind(this)} 
                            changeItems={this.changeBreadCrum.bind(this)} {...props}/>
                        </div>
                    }/>
                    <Route exact path='/items/:productId' render={(props) => 
                        <div className={ this.state.loading ?  'hidden' : 'visible' }>
                            <Detail loading={this.changeLoadState.bind(this)} {...props}/>
                        </div>
                    }/>
                </Router>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));