import React from 'react';
import './styles.css';

const Result = (props) => {

  const options = props.results.map(r => (
    
    <li onClick={() => props.onItemClicked(r.id)}  className={'item'} key={r.id}>
        <img alt={r.title} className='image' src={r.thumbnail} />
        <div className='data'>
          <h2>{r.currency_id} {r.price}</h2>
          <h3>{r.title}</h3>
          <span>{r.condition}</span>
        </div>
        <div className='dataExtra'>
          <span>{r.state_name}</span> 
        </div>
    </li>
  ))
  return <ul>{options}</ul>
}

export default Result