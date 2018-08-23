import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withCookies } from 'react-cookie'
import { connect } from 'react-redux'
import { Menu, Icon } from 'antd'
import { NavLink } from 'react-router-dom'

class Menux extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    props.resetLogin('settingrooms')
  }
  render () {
    return (
      <div>
        <Menu mode='horizontal' selectedKeys={[this.props.current]} onClick={this.props.handleClickMenu.bind(this)}>
          <Menu.Item key='settingrooms'>
            <Icon type='setting' />Setting Rooms
          </Menu.Item>
          <Menu.Item key='schedule'>
            <Icon type='area-chart' />Schedule
          </Menu.Item>
          <Menu.Item key='logout'>
            <NavLink to='/'><Icon type='logout' />Logout</NavLink>
          </Menu.Item>
        </Menu>
      </div>
    )
  }
}

const mapState = state => { return state.root }

const mapDispatch = dispatch => { return dispatch.root }

export default withCookies(connect(mapState, mapDispatch)(Menux))
