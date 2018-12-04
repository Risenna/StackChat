import React, {Component} from 'react'
import {inputName} from '../store'
import {connect} from 'react-redux'

class NameEntry extends Component {
  constructor() {
    super() 
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.props.nameEntry(event.target.value)
  }

  render() {
    // console.log('I am the state', this.props.name);
    return (
      <form className="form-inline">
        <label htmlFor="name">Your name:</label>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          className="form-control"
          value={this.props.name}
          onChange={this.handleChange}
        />
      </form>
    )
  }
}

const mapStateToProps = (state) => {
  return ({
    name: state.name
  })
}

const mapDispatchToProps = (dispatch) => {
  return ({
    nameEntry: (name) => dispatch(inputName(name))
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(NameEntry)