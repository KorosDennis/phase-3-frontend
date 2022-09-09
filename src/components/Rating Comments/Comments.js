import React, {Component} from 'react'

import {formatDistanceToNow} from 'date-fns'

import {v4 as uuidv4} from 'uuid'

import CommentItem from './CommentItem'

import './comment.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {
    name: '',
    comment: '',
    arrayList: [],
    count: 0,
  }

  inputValue = e => {
    this.setState({name: e.target.value})
  }

  textValue = e => {
    this.setState({comment: e.target.value})
  }

  addComment = e => {
    e.preventDefault()
    const {name, comment} = this.state
    const firstName = name.slice(0, 1)
    const date = formatDistanceToNow(new Date())
    const index =
      initialContainerBackgroundClassNames[Math.floor(Math.random() * 7)]
    const object = {
      id: uuidv4(),
      firstNames: firstName,
      names: name,
      comments: comment,
      dates: date,
      newClass: index,
      isFavorite: false,
    }
    this.setState(prevState => ({
      arrayList: [...prevState.arrayList, object],
      name: '',
      comment: '',
      count: prevState.count + 1,
    }))
  }

  toggleFavorite = id => {
    this.setState(prevState => ({
      arrayList: prevState.arrayList.map(eachData => {
        if (eachData.id === id) {
          return {...eachData, isFavorite: !eachData.isFavorite}
        }
        return eachData
      }),
    }))
  }

  deleteComment = id => {
    const {arrayList} = this.state
    const filteredList = arrayList.filter(eachValue => eachValue.id !== id)
    this.setState(prevState => ({
      arrayList: filteredList,
      count: prevState.count - 1,
    }))
  }

  render() {
    const {name, comment, arrayList, count} = this.state
    return (
      <div className="main-container">
        <h1 className="main-heading">Comments</h1>
        <div className="inner-holder">
          <div className="element-holder">
            <p className="para1">Give your feedback/comment on a pet</p>
            <form className="element-holder" onSubmit={this.addComment}>
              <input
                type="text"
                className="name-field"
                placeholder="Your Name"
                onChange={this.inputValue}
                value={name}
              />

              <textarea
                className="comment-field"
                placeholder="Your Comment"
                onChange={this.textValue}
                value={comment}
              />
              
              <button type="submit" className="btn">
                Add rating comment
              </button>
            </form>
          </div>
        </div>
        <hr />
        <p className="comments-count">
          <span className="number-count">{count}</span> Comments
          <ul className="comment-holder">
            {arrayList.map(eachObject => (
              <CommentItem
                key={eachObject.id}
                arrayList={eachObject}
                deleteComment={this.deleteComment}
                toggleFavorite={this.toggleFavorite}
              />
            ))}
          </ul>
        </p>
      </div>
    )
  }
}
export default Comments;