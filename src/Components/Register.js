import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withCookies } from 'react-cookie'
import { connect } from 'react-redux'
import { Form, Button, Input, Icon } from 'antd'
import Notifications from 'react-notify-toast'
import { NavLink } from 'react-router-dom'
import logo from '../images/2.png'

class Register extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  onRegister () {
    this.props.onRegister(this.props.history)
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
                <Input onChange={this.props.handleChange.bind(this)} name='fristname' value={this.props.fristname} prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />} type='text' placeholder='Fristname' />
              </Form.Item>
              <Form.Item>
                <Input onChange={this.props.handleChange.bind(this)} name='lastname' value={this.props.lastname} prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />} type='text' placeholder='Lastname' />
              </Form.Item>
              <Form.Item>
                <Input onChange={this.props.handleChange.bind(this)} name='username' value={this.props.username} prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />} type='text' placeholder='Username' />
              </Form.Item>
              <Form.Item>
                <Input onChange={this.props.handleChange.bind(this)} name='password' value={this.props.password} prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />} type='password' placeholder='Password' />
              </Form.Item>
              <Form.Item>
                <Button onClick={this.onRegister.bind(this)} type='primary' ghost block>
                  Register
                </Button>
              </Form.Item>
              <Form.Item>
                <NavLink to='/'>
                  <Button type='danger' ghost block>
                    Login
                  </Button>
                </NavLink>
              </Form.Item>
            </Form>
          </div>
        </div>
        <Notifications />
      </div>
    )
  }
}
Register.propTypes = {
  username: PropTypes.string,
  password: PropTypes.string
}

const mapState = state => { return state.root }

const mapDispatch = dispatch => { return dispatch.root }

export default withCookies(connect(mapState, mapDispatch)(Register))
