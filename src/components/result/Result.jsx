import React, { Component } from 'react';
import Paginator from '../paginator/Paginator'
import axios from 'axios';
import { getUrlParameter } from 'lib'
import config from 'config';
import './styles.css';


class Result extends Component {

  constructor() {
    super();
    this.onProductClicked = this.onProductClicked.bind(this);
    this.onPaginatorRequest = this.onPaginatorRequest.bind(this);
  }

  state = {
    query: '',
    results: [],
    offset:0,
    paginator: {
      current_page: 0,
      total_pages: 0,
      total_count: 0,
      max_per_page: 0
    }
  }

  componentWillMount() {
    this.prepareSearch();
  }

  componentWillReceiveProps = (nextProps)=> {

      const query = getUrlParameter(nextProps.location.search, 'search');
      const offset = getUrlParameter(nextProps.location.search, 'offset') || 0;
      if (query !== this.state.query || offset !== this.state.offset) {
        window.location.reload();
      }
  };

  prepareSearch() {
    const query = getUrlParameter(this.props.location.search, 'search');
    const offset = getUrlParameter(this.props.location.search, 'offset') || 0;
    this.setState({
      results: [],
      query: query,
      offset: offset
    });
    this.search(query, offset);
  }

  search = (query, offset) => {
    
    this.props.loading(true);
    this.props.changeItems([]);

    axios.get(`${config.API_URL}items?q=${query}&offset=${offset}`)
      .then(({ data }) => {
        this.setState({
          results: data.items,
          query: query,
          paginator: {
            max_per_page: 4,
            current_page: (offset? parseInt(offset): 1),
            total_count: data.paging.total,
            total_pages: (data.paging.total/4)
          }
        });
        const breadItems = [
          { to: '/', label: data.categories[0].name }
        ]
        this.props.changeItems(breadItems);
        this.props.loading(false);
        
      }).catch(
        error => {
          this.props.loading(false);
        }
      );
  }

  onProductClicked(id) {
    if (id) {
      this.props.history.push(`/items/${id}`);
    }
  }

  onPaginatorRequest(page){
    this.setState({
      paginator: {
        current_page: page,
        total_pages: this.state.paginator.total_pages,
        total_count: this.state.paginator.total_count,
        max_per_page: 4
      }
    });
    
    this.props.history.push(`/items?search=${this.state.query}&offset=${page}`);
    
  }


  render() {

    const options = this.state.results.map(r => (

      <li onClick={() => this.onProductClicked(r.id)} className={'item'} key={r.id}>
        <img alt={r.title} className='image' src={r.thumbnail} />
        <div className='data'>
          <div className='price'>
            <span>{r.currency_id} {r.price}</span>
            <div title='envio gratis' className='freeShipping' 
              style={{ display: r.free_shipping ? 'block': 'none' }}>
            </div>
          </div>
          
          <span className='title'>{r.title}</span>
          <span>{r.condition}</span>
        </div>
        <div className='dataExtra'>
          <span>{r.state_name}</span>
        </div>
      </li>

    ))

    return (
      <div className='resultContainer'>
        <ul>{options}</ul>
        <Paginator 
          pagination={this.state.paginator} 
          onPageRequest={this.onPaginatorRequest} 
        />
      </div>
      
    )
  }
}

export default Result