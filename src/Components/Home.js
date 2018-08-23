import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withCookies } from 'react-cookie'
import { connect } from 'react-redux'
import { Form, Button, Input, Icon } from 'antd'
import Notifications from 'react-notify-toast'
import { NavLink } from 'react-router-dom'
import logo from '../images/2.png'

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  onLogin () {
    this.props.onLogin(this.props.history)
  }
  render () {
    return (
      <div>
        <div className='box-center'>
          <img alt='DHS' style={{
            width: 140,
            marginBottom: 20
          }} src={logo} />
          <div className='box-panel'>
            <Form>
              <Form.Item>
                <Input onChange={this.props.handleChange.bind(this)} name='username' value={this.props.username} prefix={<Icon type='user' />} type='text' placeholder='Username' />
              </Form.Item>
              <Form.Item>
                <Input onChange={this.props.handleChange.bind(this)} name='password' value={this.props.password} prefix={<Icon type='lock' />} type='password' placeholder='Password' />
              </Form.Item>
              <Form.Item>
                <Button onClick={this.onLogin.bind(this)} type='primary' ghost block>
                  Login
                </Button>
              </Form.Item>
            </Form>
          </div>
          <NavLink to='/register'>Register Now !</NavLink>
        </div>
        <Notifications />
      </div>
    )
  }
}
Home.propTypes = {
  username: PropTypes.string,
  password: PropTypes.string
}

const mapState = state => { return state.root }

const mapDispatch = dispatch => { return dispatch.root }

export default withCookies(connect(mapState, mapDispatch)(Home))
