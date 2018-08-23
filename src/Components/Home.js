import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withCookies } from 'react-cookie'
import { connect } from 'react-redux'
import { Form, Button, Input, Icon, Avatar } from 'antd'
import Notifications, { notify } from 'react-notify-toast'
import { NavLink } from 'react-router-dom'
import logo from '../images/2.png'

class Home extends Component {
  render () {
    return (
      <div>
        <div className='box-center'>
          <img style={{
            width: 140,
            marginBottom: 20
          }} src={logo} />
          <div className='box-panel'>
            <Form>
              <Form.Item>
                <Input prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />} type='text' placeholder='Username' />
              </Form.Item>
              <Form.Item>
                <Input prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />} type='password' placeholder='Password' />
              </Form.Item>
              <Form.Item>
                <Button type='primary' htmlType='submit' block>
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
