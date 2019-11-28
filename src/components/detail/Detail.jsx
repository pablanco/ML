import React, { Component } from 'react';
import axios from 'axios';
import './styles.css';

const API_URL = 'http://localhost:3000/api/items/'

class Detail extends Component {
    state = {
        id: '',
        productInfo: {}
    }

    componentWillMount() {
        const { productId } = this.props.match.params;
        console.log('++'  + productId);
        this.getInfo(productId);

    }

    getInfo = (id) => {
        axios.get(`${API_URL}${id}`)
            .then(({ data }) => {
                console.log(data);
                this.setState(() => ({ productInfo: data, productId: id }));
            })
    }

    render() {
        return (
            <div className='productContainer'>
                <div className='top'>
                    <img alt='' className='image' src={this.state.productInfo.thumbnail} />
                    <div className='data'>
                        <h2>{this.state.productInfo.title}</h2>
                    </div>
                </div>
                <div className='bottom'>
                    <p>{this.state.productInfo.title}</p>
                </div>

            </div>
        )
    }
}

export default Detail