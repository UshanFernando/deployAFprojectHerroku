import React, { Component } from 'react';
import StarSeries from '../SingleProduct/StarSeries';
import Auth from '../../Authentication/Auth';

class CommentView extends Component {

  constructor(props) {
    super(props);

    this.state = {
      user: "",
      productId:props.pId,
      name: "",
      message: "",
      rating: 0,
      avg: 0.0,
      oneStars: 0,
      twoStars: 0,
      threeStars: 0,
      fourStars: 0,
      fiveStars: 0,
      disabled: false,
      comments: []
    };
    
    //this.handleChange = this.handleChange.bind(this);
    this.loadComments = this.loadComments.bind(this);
    this.editComment = this.editComment.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
    this.updateComment = this.updateComment.bind(this);

  }
  async componentDidMount() {
    if(Auth.isAuthenticated()){
      this.setState({
        user:Auth.getUserId()
      })
    }
    this.loadComments();
  }
  async loadComments() {
    try {
      const res = await fetch("http://localhost:5000/comment/commentz/"+this.state.productId);
      const data = await res.json();

      data.map((comment) => {
        comment.disabled = false
      });
      
      this.setState({
        comments: data,
      });

    } catch (e) {
      console.log(e);
    }

    if (this.state.comments != null) {
      let one = 0, two = 0, three = 0, four = 0, five = 0, average = 0.0;
      this.state.comments.map((comment) => {
        if (comment.rating == 1) {
          one++;
        } else if (comment.rating == 2) {
          two++;
        } else if (comment.rating == 3) {
          three++;
        } else if (comment.rating == 4) {
          four++;
        } else {
          five++;
        }

        average = (1 * one + 2 * two + 3 * three + 4 * four + 5 * five) / (one + two + three + four + five);

      })
      this.setState({
        oneStars: one,
        twoStars: two,
        threeStars: three,
        fourStars: four,
        fiveStars: five,
        avg: average.toFixed(1)
      });
    }


  }
  editComment(id) {
    //console.log(this.state.comments[index].name);

    const items = this.state.comments;
    items.map(item => {
      if (item._id === id) {
        if (item.disabled == false) {
          item.disabled = true;
        } else {
          item.disabled = false;
        }

      }
      this.setState({
        comments: items
      })
      // this.setState( {disabled: !this.state.disabled} )
    })
  }
  handleChange(index, event) {
    const val = event.target.value;
    const items = this.state.comments;
    items.map(item => {
      if (item._id === index) {
        item.message = val;
       
      }
      this.setState({
        comments: items
      })
    })
  }
  async deleteComment(id) {
    try {
      const requestOptions = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: id }),
      };
      await fetch("http://localhost:5000/comment/comments", requestOptions);
      alert("Deleted");
      this.loadComments();
    } catch (e) {
      console.log(e);
    }
  }

  async updateComment(id) {
    try {
      const items = this.state.comments;
      let cmt=items.filter(item => item._id==id).map(item => {
        return item;
      })
      console.log(cmt);
      if(cmt[0].user==this.state.user){
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        
        body: JSON.stringify({
          id: cmt[0]._id,
          message: cmt[0].message
        }),
      };
      await fetch("http://localhost:5000/comment/comments", requestOptions);
      alert("Updated");
      this.editComment(cmt[0]._id) ;

    }else{
      alert("User Error");
    }
    } catch (e) {
      console.log(e);
    }
  }


  render() {
    let commentList = null;
    const user = require('../img/User/USER.png');

    if (this.state.comments != null) {
      commentList = this.state.comments.map((comment, index) => {
        return (<div className="review_item" key={index}>
          <div className="media">
            <div className="d-flex">
              <img id="userImg" src={user} alt="aa" />
            </div>

            <div className="media-body">

              <h4>{comment.name}</h4>
              <StarSeries count={comment.rating} />

            </div>
            <span id={(comment.user==this.state.user) ? "editDeleteIcons" : "hideElement"} >{(!comment.disabled) ? <i onClick={() => this.editComment(comment._id)} className="far fa-edit fa-lg" /> : <i  onClick={() => this.updateComment(comment._id)} className="fas fa-check fa-lg" /> }&emsp;<i onClick={(e) => { if (window.confirm('Are you sure you wish to delete this item?')) this.deleteComment(comment._id) } }className="far fa-trash-alt fa-lg"></i>&emsp;</span>
          </div>

          <textarea className="form-control different-control w-100" name="message" id="textareaASD" cols="30" onChange={(e) => this.handleChange(comment._id, e)} value={comment.message} disabled={(comment.disabled) ? "" : "disabled"} />

        </div>)

      })
    }

    return (
      <div className="col-lg-6">
        <div className="row total_rate">
          <div className="col-6">
            <div className="box_total">
              <h5>Overall</h5>
              <h4>{this.state.avg}</h4>
              <h6>({this.state.comments.length} Reviews)</h6>

            </div>
          </div>
          <div className="col-6">
            <div className="rating_list">
              <h3>Based on {this.state.comments.length} Reviews</h3>
              <ul className="list">
                <li><a href>5 Star <StarSeries count={5} />{this.state.fiveStars}</a></li>
                <li><a href>4 Star <StarSeries count={4} />{this.state.fourStars}</a></li>
                <li><a href>3 Star <StarSeries count={3} />{this.state.threeStars}</a></li>
                <li><a href>2 Star <StarSeries count={2} />{this.state.twoStars}</a></li>
                <li><a href>1 Star <StarSeries count={1} />{this.state.oneStars}</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="review_list">
          {commentList}

        </div>
      </div>
    )
  }
}

export default CommentView;