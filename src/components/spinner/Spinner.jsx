import React, { Component } from 'react';
import './styles.css';

class Spinner extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            show: false,
        }
    }

    componentDidUpdate(prevProps) {
        if(prevProps.show !== this.props.show){
            this.setState({ show: this.props.show } );
        }
    }

    render() {
        return (
            <div className='spinner' style={{ display: this.state.show ? 'block': 'none' }}>
                <div className="bounce1"></div>
                <div className="bounce2"></div>
                <div className="bounce3"></div>
            </div>
        );
    }
}

export default Spinner