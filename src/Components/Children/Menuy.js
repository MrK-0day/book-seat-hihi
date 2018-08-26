import React, { Component } from 'react'
import { withCookies } from 'react-cookie'
import { connect } from 'react-redux'
import { Menu, Icon, Affix } from 'antd'
import { NavLink } from 'react-router-dom'

class Menuy extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    props.resetLogin('bookseat')
  }
  render () {
    return (
      <Affix>
        <Menu mode='horizontal' selectedKeys={[this.props.current]} onClick={this.props.handleClickMenu.bind(this)}>
          <Menu.Item key='bookseat'>
            <Icon type='home' />Book Seat
          </Menu.Item>
          <Menu.Item style={{
            float: 'right'
          }} key='logout'>
            <NavLink to='/'><Icon type='logout' />Logout</NavLink>
          </Menu.Item>
        </Menu>
      </Affix>
    )
  }
}

const mapState = state => { return state.root }

const mapDispatch = dispatch => { return dispatch.root }

export default withCookies(connect(mapState, mapDispatch)(Menuy))
