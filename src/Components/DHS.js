import React, { Component } from 'react'
import { withCookies } from 'react-cookie'
import { connect } from 'react-redux'
import Notifications from 'react-notify-toast'

import Menuy from './Children/Menuy'
import BookSeat from './Children/BookSeat'

class DHS extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  render () {
    return (
      <div>
        <Menuy />
        {this.props.current === 'bookseat' && (<BookSeat />)}
        <Notifications />
      </div>
    )
  }
}

const mapState = state => { return state.root }

const mapDispatch = dispatch => { return dispatch.root }

export default withCookies(connect(mapState, mapDispatch)(DHS))
