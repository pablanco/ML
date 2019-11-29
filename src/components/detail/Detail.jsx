import React, { Component } from 'react';
import axios from 'axios';
import config from 'config';
import './styles.css';

class Detail extends Component {
    
    state = {
        id: '',
        productInfo: {}
    }

    componentWillMount() {
        const { productId } = this.props.match.params;
        this.getProduct(productId);
    }

    getProduct = (id) => {
        this.props.loading(true);
        axios.get(`${config.API_URL}items/${id}`)
        .then(({ data }) => {
            this.setState(() => ({ productInfo: data, productId: id }));
            this.props.loading(false);
        }).catch(
            error => {
                this.props.loading(false);
            }
        );
    }

    render() {
        return (
            <div className='productContainer'>
                <div className='top'>
                    <img title={this.state.productInfo.title} className='image' src={this.state.productInfo.thumbnail} />
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