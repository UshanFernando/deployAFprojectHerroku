import React, { Component } from "react";
import { Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import StarSeries from '../SingleProduct/StarSeries';
import Auth from '../../Authentication/Auth';

class CommentForm extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            user:"",
            name: "",
            redirect:false,
            message:"",
            rating:0,
            productId:props.pId,
            comments: null,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
      }

      handleChange(event) {
        const target = event.target;
        const value =  target.value
        const name= target.name;
       
        this.setState({
            [name]:value
        
        });
      }
      handleRating(num) {
        
        this.setState({
            rating:num
        
        });
      }
    
      async handleSubmit(event) {
        event.preventDefault();
        if(Auth.isAuthenticated()){
          let userId=Auth.getUserId();

        if(this.state.rating==0){
          alert("Please enter a rating");
        }else {
          
          if(this.state.name==""){
            alert('You Have Submitted ' + this.state.rating+' Star Rating anonymously, Thank You!');
          }else {
            alert('You Have Submitted ' + this.state.rating+'  Star Rating, Thank You!');
          }
        

        if (this.state.name.trim() != 0) {
            try {
              const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json","token":Auth.getToken() },
                body: JSON.stringify({ 
                    name: this.state.name,
                    message:this.state.message, 
                    rating:this.state.rating,
                    user:userId,
                    product:this.state.productId
                  
                  }),
              };
               await fetch(
                "http://localhost:5000/comment/newComment",
                requestOptions
              );
              
              this.setState({
                name: "",
                message:"",
                rating:0,
                user:0
              });
            } catch (e) {
              console.log(e);
            }
          }
        }
        this.props.refComments();
      }else{
        this.setState({
          redirect:true
        })
      }
        
      }	

      
    
      
       
    render() {
      if (this.state.redirect) {
        return <Redirect to="/login" />;
      }
        const price = this.state.rating;
        let comp;
    
        if (price==1) {
    
          comp =<div> <ul className="list"><li><a  onClick={() => this.handleRating(1)}value="1" name="rating"><i className="fa fa-star fa-2x"></i></a></li>
          <li><a  onClick={() => this.handleRating(2)}value="1" name="rating"><i className="fa fa-star-o fa-2x"></i></a></li>
          <li><a  onClick={() => this.handleRating(3)}value="1" name="rating"><i className="fa fa-star-o fa-2x"></i></a></li>
          <li><a  onClick={() => this.handleRating(4)}value="1" name="rating"><i className="fa fa-star-o fa-2x"></i></a></li>
          <li><a  onClick={() => this.handleRating(5)}value="1" name="rating"><i className="fa fa-star-o fa-2x"></i></a></li></ul>
          <p>Very Bad</p>
                    </div>
        } else if(price==2) {
    
          comp = <div><ul className="list"><li><a  onClick={() => this.handleRating(1)}value="1" name="rating"><i className="fa fa-star fa-2x"></i></a></li>
          <li><a  onClick={() => this.handleRating(2)}value="1" name="rating"><i className="fa fa-star fa-2x"></i></a></li>
          <li><a  onClick={() => this.handleRating(3)}value="1" name="rating"><i className="fa fa-star-o fa-2x"></i></a></li>
          <li><a  onClick={() => this.handleRating(4)}value="1" name="rating"><i className="fa fa-star-o fa-2x"></i></a></li>
          <li><a  onClick={() => this.handleRating(5)}value="1" name="rating"><i className="fa fa-star-o fa-2x"></i></a></li></ul>
          <p>Bad</p>
                    </div>
        } else if(price==3){
            comp =<div> <ul className="list"><li><a  onClick={() => this.handleRating(1)}value="1" name="rating"><i className="fa fa-star fa-2x"></i></a></li>
          <li><a  onClick={() => this.handleRating(2)}value="1" name="rating"><i className="fa fa-star fa-2x"></i></a></li>
          <li><a  onClick={() => this.handleRating(3)}value="1" name="rating"><i className="fa fa-star fa-2x"></i></a></li>
          <li><a  onClick={() => this.handleRating(4)}value="1" name="rating"><i className="fa fa-star-o fa-2x"></i></a></li>
          <li><a  onClick={() => this.handleRating(5)}value="1" name="rating"><i className="fa fa-star-o fa-2x"></i></a></li></ul>
          <p>Average</p>
                    </div>

        }else if(price==4){
            comp = <div><ul className="list"><li><a  onClick={() => this.handleRating(1)}value="1" name="rating"><i className="fa fa-star fa-2x"></i></a></li>
          <li><a  onClick={() => this.handleRating(2)}value="1" name="rating"><i className="fa fa-star fa-2x"></i></a></li>
          <li><a  onClick={() => this.handleRating(3)}value="1" name="rating"><i className="fa fa-star fa-2x"></i></a></li>
          <li><a  onClick={() => this.handleRating(4)}value="1" name="rating"><i className="fa fa-star fa-2x"></i></a></li>
          <li><a  onClick={() => this.handleRating(5)}value="1" name="rating"><i className="fa fa-star-o fa-2x"></i></a></li></ul>
          <p>Good</p>
                    </div>
        }else if(price==5){
            comp =<div> <ul className="list"><li><a  onClick={() => this.handleRating(1)}value="1" name="rating"><i className="fa fa-star fa-2x"></i></a></li>
          <li><a  onClick={() => this.handleRating(2)}value="1" name="rating"><i className="fa fa-star fa-2x"></i></a></li>
          <li><a  onClick={() => this.handleRating(3)}value="1" name="rating"><i className="fa fa-star fa-2x"></i></a></li>
          <li><a  onClick={() => this.handleRating(4)}value="1" name="rating"><i className="fa fa-star fa-2x"></i></a></li>
          <li><a  onClick={() => this.handleRating(5)}value="1" name="rating"><i className="fa fa-star fa-2x"></i></a></li></ul>
          <p>Outstanding</p>
                    </div>
        
        }else{
    
            comp = <div><ul className="list"><li><a  onClick={() => this.handleRating(1)}value="1" name="rating"><i className="fa fa-star-o fa-2x"></i></a></li>
                    <li><a  onClick={() => this.handleRating(2)}value="1" name="rating"><i className="fa fa-star-o fa-2x"></i></a></li>
                    <li><a  onClick={() => this.handleRating(3)}value="1" name="rating"><i className="fa fa-star-o fa-2x"></i></a></li>
                    <li><a  onClick={() => this.handleRating(4)}value="1" name="rating"><i className="fa fa-star-o fa-2x"></i></a></li>
                    <li><a  onClick={() => this.handleRating(5)}value="1" name="rating"><i className="fa fa-star-o fa-2x"></i></a></li></ul>
                    <p>No Rating</p>
                    </div>
        }
    
        
        return (
            <div className="col-lg-6">
                <div className="review_box">
                    <h4>Add a Review </h4>
                    <p>Your Rating:</p>
                    
                         
                        {comp}
                        
                   
                    
                    <form action="#/" className="form-contact form-review mt-3" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <input className="form-control" name="name" type="text" placeholder="Enter your name" onChange={this.handleChange}  value={this.state.name} />
                        </div>
                        
                        <input className="form-control" name="email" type="hidden" placeholder="Enter email address" onChange={this.handleChange} required value="" />
                        
                       
                        <div className="form-group">
                            <textarea className="form-control different-control w-100" name="message" id="textarea" cols="30" rows="5"onChange={this.handleChange} placeholder="Enter Message" value={this.state.message}/>
                        </div>
                        <div className="form-group text-center text-md-right mt-3">
                            <button type="submit" className="button button--active button-review">Submit Now</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
export default CommentForm;