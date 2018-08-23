import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withCookies } from 'react-cookie'
import { connect } from 'react-redux'
import { Col, Input, Button, Icon, Row, Select } from 'antd'

class DataSettingRooms extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  render () {
    return (
      <div className='box-body'>
        <Row type='flex'>
          <Col className='box-input' span={12}>
            <Input onChange={this.props.handleChange.bind(this)} name='roomname' value={this.props.roomname} prefix={<Icon type='bank' />} type='text' placeholder='Room' />
          </Col>
          <Col className='box-input' span={6}>
            <Input onChange={this.props.handleChange.bind(this)} name='width' value={this.props.width} prefix={<Icon type='arrow-right' />} type='text' placeholder='Width' />
          </Col>
          <Col className='box-input' span={6}>
            <Input onChange={this.props.handleChange.bind(this)} name='length' value={this.props.length} prefix={<Icon type='arrow-up' />} type='text' placeholder='Length' />
          </Col>
        </Row>
        <div className='box-line' />
        <Row type='flex'>
          <Col className='box-input' span={6}>
            <Button onClick={this.props.resetMap.bind(this)} type='danger' ghost block>Reset</Button>
          </Col>
          <Col className='box-input' span={12}>
            <Button.Group>
              <Button onClick={this.props.handleClickSwap.bind(this)} name='seat' type='primary' ghost={!(this.props.pen === 'seat')}>
                Seat
              </Button>
              <Button onClick={this.props.handleClickSwap.bind(this)} name='disable' type='primary' ghost={this.props.pen === 'seat'}>
                Disable
              </Button>
            </Button.Group>
          </Col>
          <Col className='box-input' span={6}>
            <Button onClick={this.props.initMap.bind(this)} type='primary' ghost block>Create</Button>
          </Col>
        </Row>
        <div className='box-line' />
        <Row type='flex'>
          <Col className='box-input' span={18}>
            <Select style={{minWidth: '100%'}} defaultValue='Room 1'>
              <Select.Option key='0' value='Room 1'>Room 1</Select.Option>
              <Select.Option key='1' value='Room 2'>Room 2</Select.Option>
              <Select.Option key='2' value='Room 3'>Room 3</Select.Option>
            </Select>
          </Col>
          <Col className='box-input' span={6}>
            <Button type='danger' ghost block>Remove</Button>
          </Col>
        </Row>
        <div className='box-line' />
        {this.props.map.length !== 0 && (
          <div>
            {this.props.map.map((r, i) => {
              return (
                <Row key={i} type='flex'>
                  {r.map((c, j) => {
                    return (
                      <Col onClick={this.props.handleClickSeat.bind(this)} style={{
                        backgroundColor: c.color,
                        height: 50,
                        borderStyle: 'solid',
                        borderColor: '#ecf0f1',
                        borderWidth: 1
                      }} id={`${i}-${j}`} key={j} span={3} />
                    )
                  })}
                </Row>
              )
            })}
            <div className='box-line' />
            <Button style={{float: 'right'}} type='primary' ghost>Complete</Button>
          </div>
        )}
      </div>
    )
  }
}

const mapState = state => { return state.root }

const mapDispatch = dispatch => { return dispatch.root }

export default withCookies(connect(mapState, mapDispatch)(DataSettingRooms))
