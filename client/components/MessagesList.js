import React, { Component } from 'react';
import Message from './Message';
import NewMessageEntry from './NewMessageEntry';
import { connect } from 'react-redux'
import { getMessages } from '../store'

class MessagesList extends Component {

  constructor() {
    super();
    this.state = { messages: [] };
  }

  componentDidMount() {
    this.props.getMessages()
  }

  render() {

    const channelId = Number(this.props.match.params.channelId); // because it's a string "1", not a number!
    const messages = this.props.messages;
    const filteredMessages = messages.filter(message => message.channelId === channelId);

    return (
      <div>
        <ul className="media-list">
          {filteredMessages.map(message => <Message message={message} key={message.id} />)}
        </ul>
        <NewMessageEntry channelId={channelId} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return ({
    messages: state.messages
  })
}

const mapDispatchToProps = dispatch => {
  return {
    getMessages: () => dispatch(getMessages())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagesList);
