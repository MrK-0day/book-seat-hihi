import React, { Component } from 'react'
import { withCookies } from 'react-cookie'
import { connect } from 'react-redux'
import { DatePicker, Col, Row, Select } from 'antd'
import { Popup, Header, Button } from 'semantic-ui-react'
import { Subscription } from 'react-apollo'
import gql from 'graphql-tag'

const REAL_TIME = gql`
  subscription scheduleUpdate {
    scheduleUpdate {
      _id roomId seatId userId timestamp
      room {
        _id code name width length isEnabled
        seats {
          x y state
        }
      }
      user {
        name
      }
      seat {
        x y state
      }
    }
  }
`

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
    this.props.getRooms()
    this.props.AsnycRoom()
  }
  pickSeat (e) {
    this.props.PickSeat(`${e.target.id}|${e.target.name}`)
  }
  removeSeat (e) {
    this.props.AsyncRemoveSeat(e.target.id)
    this.props.getRooms()
    this.props.AsnycRoom()
  }
  render () {
    return (
      <div className='box-body'>
        <Subscription subscription={REAL_TIME}>
          {({data, loading}) => {
            if (!loading) {
              console.log(data.scheduleUpdate)
            }
            return null
          }}
        </Subscription>
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
        {this.props.pickroom !== '' && this.props.pickdate !== '' && (
          <div>
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
                        if (c.color === '#2ecc71' || c.color === '#e67e22') {
                          // xanh
                          if (c.timestamp !== '17-30') {
                            return (
                              <Popup key={j} trigger={
                                <div style={{
                                  width: Math.floor(100 / this.props.width) + '%',
                                  backgroundColor: c.color,
                                  borderStyle: 'solid',
                                  borderColor: '#ecf0f1',
                                  borderWidth: 1
                                }} />
                              } position='top right' hoverable flowing>
                                <Header as='h6'>{`Select session for seat (${i}_${j})`}</Header>
                                {c.timestamp === '08-30' ? (
                                  <Button name={`${c.id}|PM`} id={`${i}_${j}`} onClick={this.pickSeat.bind(this)} color='green' size='tiny'>PM</Button>
                                ) : (c.timestamp === '13-30' ? (
                                  <Button name={`${c.id}|AM`} id={`${i}_${j}`} onClick={this.pickSeat.bind(this)} color='orange' size='tiny'>AM</Button>
                                ) : (
                                  <div>
                                    <Button name={`${c.id}|AM`} id={`${i}_${j}`} onClick={this.pickSeat.bind(this)} color='orange' size='tiny'>AM</Button>
                                    <Button name={`${c.id}|PM`} id={`${i}_${j}`} onClick={this.pickSeat.bind(this)} color='green' size='tiny'>PM</Button>
                                    <Button name={`${c.id}|FULL`} id={`${i}_${j}`} onClick={this.pickSeat.bind(this)} color='blue' size='tiny'>FULL</Button>
                                  </div>
                                ))}
                              </Popup>
                            )
                          } else {
                            return (
                              <div key={j} style={{
                                width: Math.floor(100 / this.props.width) + '%',
                                backgroundColor: c.color,
                                borderStyle: 'solid',
                                borderColor: '#ecf0f1',
                                borderWidth: 1
                              }} id={c.idschedule} onClick={this.removeSeat.bind(this)} />
                            )
                          }
                        } else if (c.color === '#e74c3c') {
                          return (
                            <div key={j} style={{
                              width: Math.floor(100 / this.props.width) + '%',
                              backgroundColor: c.color,
                              borderStyle: 'solid',
                              borderColor: '#ecf0f1',
                              borderWidth: 1
                            }} />
                          )
                        } else {
                          return (
                            <div key={j} style={{
                              width: Math.floor(100 / this.props.width) + '%',
                              backgroundColor: c.color,
                              borderStyle: 'solid',
                              borderColor: '#ecf0f1',
                              borderWidth: 1
                            }} />
                          )
                        }
                      })}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}
      </div>
    )
  }
}

const mapState = state => { return state.root }

const mapDispatch = dispatch => { return dispatch.root }

export default withCookies(connect(mapState, mapDispatch)(BookSeat))
