import React, { Component } from 'react'
import { withCookies } from 'react-cookie'
import { connect } from 'react-redux'
import Notifications from 'react-notify-toast'

import Menux from './Children/Menu'
import DataSettingRooms from './Children/DataSettingRooms'

class Admin extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  render () {
    return (
      <div>
        <Menux />
        {this.props.current === 'settingrooms' && (<DataSettingRooms />)}
        {this.props.current === 'schedule' && (
          <div className='box-body'>schedule</div>
        )}
        <Notifications />
      </div>
    )
  }
}

const mapState = state => { return state.root }

const mapDispatch = dispatch => { return dispatch.root }

export default withCookies(connect(mapState, mapDispatch)(Admin))
