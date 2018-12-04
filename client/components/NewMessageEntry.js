import React, { Component } from 'react';
import { connect } from 'react-redux'
import {writeMessage, postNewMessageToServer} from '../store'

class NewMessageEntry extends Component {
  constructor(){
    super()
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(event) {
    this.props.write(event.target.value)
  }
  handleSubmit(event) {
    event.preventDefault()
    console.log('here')
    const channelId = this.props.channelId
    const content = this.props.newMessageEntry
    const author = this.props.name
    this.props.post({content, channelId, author})
    this.props.write('')
    
  }
  render () {
    return (
      <form onSubmit={this.handleSubmit} id="new-message-form">
        <div className="input-group input-group-lg">
          <input
            onChange={this.handleChange}
            value={this.props.newMessageEntry}
            className="form-control"
            type="text"
            name="content"
            placeholder="Say something nice..."
          />
          <span className="input-group-btn">
            <button className="btn btn-default" type="submit">Chat!</button>
          </span>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return ({
    newMessageEntry: state.newMessageEntry,
    name: state.name
  })
}
const mapDispatchToProps = (dispatch) => {
  return ({
    write: (string) => dispatch(writeMessage(string)),
    post: (messageObj) => dispatch(postNewMessageToServer(messageObj))
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(NewMessageEntry)
