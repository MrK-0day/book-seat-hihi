import React, { Component } from 'react'
import { withCookies } from 'react-cookie'
import { connect } from 'react-redux'
import { DatePicker, Col, Row, Select, Popconfirm, message } from 'antd'

const moment = require('moment')
moment().format()

class BookSeat extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  componentDidMount () {
    this.props.getListroom()
  }
  onChangeRoom (value) {
    this.props.handleChangeCustom('pickroom', value)
    this.props.getRooms()
  }
  onChangeDate (dateString) {
    let date = dateString.format('DD-MM-YYYY')
    this.props.handleChangeCustom('pickdate', date)
  }
  onPick (e) {
    this.setState({
      log: e.target.id
    })
  }
  onPickAM () {
    this.props.PickAM(this.state.log)
  }
  onPickPM () {
    this.props.PickAM(this.state.log)
  }
  onPickLock () {
    message.error(`Can't Pick Seat !`)
  }
  onPickFull () {
    message.success(`hihi`)
  }
  render () {
    return (
      <div className='box-body'>
        <Row type='flex'>
          <Col className='box-inpit' span={12}>
            <Select onChange={this.onChangeRoom.bind(this)} defaultValue={this.props.listroom[0]} style={{minWidth: '100%'}}>
              {this.props.listroom.map((v, i) => {
                return (<Select.Option key={i} value={v}>{v}</Select.Option>)
              })}
            </Select>
          </Col>
          <Col className='box-input' span={12}>
            <DatePicker onChange={this.onChangeDate.bind(this)} style={{minWidth: '100%'}} dateRender={(current) => {
              const style = {}
              if (moment().get('date') + 7 > 31) {
                if (current.get('month') + 1 === moment().get('month') + 2) {
                  if (current.date() >= moment().day(8).get('date') && current.date() <= moment().day(13).get('date')) {
                    style.border = '1px solid #1890ff'
                    style.borderRadius = '50%'
                  }
                }
              }
              return (
                <div className='ant-calendar-date' style={style}>
                  {current.date()}
                </div>
              )
            }} />
          </Col>
        </Row>
        <div className='box-line' />
        {(this.props.map.length !== 0 && this.props.pickdate !== '') && (
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
                    if (c.color === '#2ecc71') {
                      return (
                        <Popconfirm key={j} placement='topRight' onCancel={this.onPickAM.bind(this)} onConfirm={this.onPickPM.bind(this)} title='Select session (AM/PM)' okText='PM' cancelText='AM'>
                          <div onDoubleClick={this.onPickFull.bind(this)} onClick={this.onPick.bind(this)} style={{
                            width: Math.floor(100 / this.props.width) + '%',
                            backgroundColor: c.color,
                            borderStyle: 'solid',
                            borderColor: '#ecf0f1',
                            borderWidth: 1,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                          }} id={`${i}-${j}`} >{`${i}_${j}`}</div>
                        </Popconfirm>
                      )
                    } else if (c.color === '#e74c3c') {
                      return (
                        <div key={j} style={{
                          width: Math.floor(100 / this.props.width) + '%',
                          backgroundColor: c.color,
                          borderStyle: 'solid',
                          borderColor: '#ecf0f1',
                          borderWidth: 1
                        }} id={`${i}-${j}`} onClick={this.onPickLock.bind(this)} />
                      )
                    } else {
                      return (
                        <div key={j} style={{
                          width: Math.floor(100 / this.props.width) + '%',
                          backgroundColor: c.color,
                          borderStyle: 'solid',
                          borderColor: '#ecf0f1',
                          borderWidth: 1
                        }} id={`${i}-${j}`} />
                      )
                    }
                  })}
                </div>
              )
            })}
          </div>
        )}
      </div>
    )
  }
}

const mapState = state => { return state.root }

const mapDispatch = dispatch => { return dispatch.root }

export default withCookies(connect(mapState, mapDispatch)(BookSeat))
