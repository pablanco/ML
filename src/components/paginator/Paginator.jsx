import React, { Component } from 'react';
import './styles.css';

class Paginator extends Component {

    constructor(props){
        super(props);
        this.state = {
            total_pages:  this.props.pagination.total_pages,
            current_page: this.props.pagination.current_page,
            total_count:  this.props.pagination.total_count,
            max_per_page: this.props.pagination.max_per_page
        }
    }

    componentDidUpdate(prevProps) {
        if(prevProps.pagination !== this.props.pagination){
            this.setState(
                { 
                    total_pages:  this.props.pagination.total_pages,
                    current_page: this.props.pagination.current_page,
                    total_count:  this.props.pagination.total_count,
                    max_per_page: this.props.pagination.max_per_page
                } 
            );
        }
    }

    render() {

        const allowPrevious = this.state.current_page !== 0;
        const allowNext = this.state.current_page !== this.state.total_pages;
        const firstPage = this.state.current_page === 1;
        const finalPage = this.state.current_page === this.state.total_pages;
        const previousPage = this.state.current_page - 1;
        const nextPage = this.state.current_page+1;

        return (
            <div className="pager">
            <div className='prev' onClick= { () => allowPrevious && this.props.onPageRequest(previousPage)}>
                <span>&larr; Anterior</span>
            </div>
                <div className="inline" >
                    Mostrando 
                    <span>
                        {firstPage ?
                        1 :
                        previousPage * this.state.max_per_page
                        }
                    </span>
                    <span>a</span>
                    <span>
                        {finalPage ?
                        this.state.total_count :
                        this.state.current_page * this.state.max_per_page
                        }
                    </span>
                    <span>de</span>
                    <span>{this.state.total_count}</span>
                </div>
            <div className='next' onClick= { () => allowNext && this.props.onPageRequest(nextPage)}>
                <span>Siguiente &rarr;</span>
            </div>
            </div>
        )
    }
}

export default Paginator
