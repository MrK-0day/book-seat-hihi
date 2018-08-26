import React, { Component } from 'react'
import { withCookies } from 'react-cookie'
import { connect } from 'react-redux'
import { Col, Input, Button, Icon, Row, Select } from 'antd'

class DataSettingRooms extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  componentDidMount () {
    this.props.getListroom()
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
            <Select style={{minWidth: '100%'}} defaultValue={this.props.listroom[0]}>
              {this.props.listroom.map((v, i) => {
                return (<Select.Option key={i} value={v}>{v}</Select.Option>)
              })}
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
                <div key={i} style={{
                  width: '100vw',
                  height: Math.floor(100 / this.props.width) + 'vw',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center'
                }}>
                  {r.map((c, j) => {
                    return (
                      <div onClick={this.props.handleClickSeat.bind(this)} key={j} style={{
                        width: Math.floor(100 / this.props.width) + '%',
                        backgroundColor: c.color,
                        borderStyle: 'solid',
                        borderColor: '#ecf0f1',
                        borderWidth: 1
                      }} id={`${i}-${j}`} />
                    )
                  })}
                </div>
              )
            })}
            <div className='box-line' />
            <Button className='box-input' onClick={this.props.onComplete.bind(this)} style={{float: 'right'}} type='primary' ghost>Complete</Button>
          </div>
        )}
      </div>
    )
  }
}

const mapState = state => { return state.root }

const mapDispatch = dispatch => { return dispatch.root }

export default withCookies(connect(mapState, mapDispatch)(DataSettingRooms))
