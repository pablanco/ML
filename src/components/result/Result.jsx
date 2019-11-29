import React, { Component } from 'react';
import axios from 'axios';
import { getUrlParameter } from 'lib'
import config from 'config';
import './styles.css';


class Result extends Component {

  constructor() {
    super();
    this.onProductClicked = this.onProductClicked.bind(this);
  }

  state = {
    query: '',
    results: []
  }

  componentWillMount() {
    this.prepareSearch();
  }

  componentWillReceiveProps = (props) => {
    const query = getUrlParameter(props.location.search, 'search');
    if (query !== this.state.query) {
      this.prepareSearch();
    }
  }

  prepareSearch() {
    const query = getUrlParameter(this.props.location.search, 'search');
    this.setState({
      results: [],
      query: query
    });
    this.search(query);
  }

  search = (query) => {
    this.props.loading(true);
    axios.get(`${config.API_URL}items?q=${query}`)
      .then(({ data }) => {
        this.setState({
          results: data.items,
          query: query
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


  render() {

    const options = this.state.results.map(r => (

      <li onClick={() => this.onProductClicked(r.id)} className={'item'} key={r.id}>
        <img title={r.title} className='image' src={r.thumbnail} />
        <div className='data'>
          <h2>{r.currency_id} {r.price}</h2>
          <div title='envio gratis' className='freeShipping' style={{ display: r.free_shipping ? 'block': 'none' }}></div>
          <h3>{r.title}</h3>
          <span>{r.condition}</span>
        </div>
        <div className='dataExtra'>
          <span>{r.state_name}</span>
        </div>
      </li>
    ))

    return (
      <ul>{options}</ul>
    )
  }
}

export default Result