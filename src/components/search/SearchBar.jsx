import React, { Component } from 'react';
import './styles.css';

class SearchBar extends Component {

    constructor() {
        super();
        this.onNavigateHome = this.onNavigateHome.bind(this);
    }

    state = {
        query: '',
        results: []
    }

    onInputChange = (e) => {
        this.setState({
            query: this.search.value,
            results: []
        }, () => {
            if (this.state.query && this.state.query.length > 1) {
                this.onNavigateSearch(this.state.query);
            } else if (!this.state.query) {
                alert('nada para buscar');
            }
        });
        e.preventDefault();
    }

    onNavigateHome() {
        this.search.value = '';
        this.props.changeItems([]);
        this.props.history.push(`/`);
    }

    onNavigateSearch(query) {
        this.props.history.push(`/items?search=${query}`);
    }

    render() {
        return (
            <form>
                <div className={'searchContainer'}>
                    <div title='Mercado Libre' onClick={this.onNavigateHome} className='logo' />
                    <input
                        className='field'
                        placeholder="Nunca dejes de buscar"
                        ref={input => this.search = input} 
                        />
                    <button className="button" onClick={this.onInputChange}></button>
                </div>
            </form>
        )
    }
}

export default SearchBar
