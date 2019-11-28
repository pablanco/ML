import React, { Component } from 'react';
import axios from 'axios';
import Result from '../result/Result';
import './styles.css';


const API_URL = 'http://localhost:3000/api/items?q='

class Search extends Component {
    constructor() {
        super();
        this.onProductClicked = this.onProductClicked.bind(this);
        this.onNavigateHome = this.onNavigateHome.bind(this);
      }
    state = {
        query: '',
        results: []
    }

    getInfo = () => {
        axios.get(`${API_URL}${this.state.query}`)
        .then(({ data }) => {
            this.setState({
                results: data
            })
        });
    }

    handleInputChange = (e) => {
        this.setState({
            query: this.search.value
        }, () => {
            if (this.state.query && this.state.query.length > 1) {
                this.getInfo();
            } else if (!this.state.query) {
                alert('nada para buscar');
            }
        });
        e.preventDefault();

    }

    onProductClicked(id) {
        if(id){
            this.props.history.push(`/items/${id}`);
        }
    }

    onNavigateHome() {
        this.props.history.push(`/`);
    }

    render() {
        return (
            <form>
                <div className={'searchContainer'}>
                    <div alt='mercado libre' onClick={this.onNavigateHome} className='logo'/>
                    <input 
                        className='field'                   
                        placeholder="Nunca dejes de buscar"
                        ref={input => this.search = input}/>
                    <button className="button" onClick={this.handleInputChange}></button>
                </div>
                <Result onItemClicked={this.onProductClicked} results={this.state.results} />

            </form>
        )
    }
}

export default Search
