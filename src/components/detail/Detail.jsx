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
                    <img alt={this.state.productInfo.title} className='image' src={this.state.productInfo.thumbnail} />
                    <div className='data'>
                        <span className='info'>{this.state.productInfo.condition} - {this.state.productInfo.sold_quantity} vendidos</span>
                        <span className='title'>{this.state.productInfo.title}</span>
                        <span className='price'>{this.state.productInfo.currency_id} {this.state.productInfo.price}</span>
                        <button className="button" onClick={this.onInputChange}>Comprar</button>
                    </div>
                </div>
                <div className='bottom'>
                    <h2>Descripción del producto</h2>
                    <p>{this.state.productInfo.description}</p>
                </div>

            </div>
        )
    }
}

export default Detail