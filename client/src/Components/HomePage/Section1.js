import React, { Component } from 'react'

class Section1 extends Component {
    render() {
        return (
            <div class="hero-carousel__slide">
                <img src={`http://localhost:5000/${this.props.url}`} />
                <a href="#" class="hero-carousel__slideOverlay">
                    <h3>{this.props.name}</h3>
                    <p>{this.props.category}</p>
                </a>
            </div>
        )
    };
}



export default Section1;
