import React, { Component } from 'react'
import { withCookies } from 'react-cookie'
import { connect } from 'react-redux'
import { DatePicker, Col, Row, Select } from 'antd'

class BookSeat extends Component {
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
          <Col className='box-inpit' span={12}>
            <Select defaultValue={this.props.listroom[0]} style={{minWidth: '100%'}}>
              {this.props.listroom.map((v, i) => {
                return (<Select.Option key={i} value={v}>{v}</Select.Option>)
              })}
            </Select>
          </Col>
          <Col className='box-input' span={12}>
            <DatePicker style={{minWidth: '100%'}} dateRender={(current) => {
              const style = {}
              if (current.date() === 1) {
                style.border = '1px solid #1890ff'
                style.borderRadius = '50%'
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
        {this.props.pickroom === '' && (
          <div>l</div>
        )}
      </div>
    )
  }
}

const mapState = state => { return state.root }

const mapDispatch = dispatch => { return dispatch.root }

export default withCookies(connect(mapState, mapDispatch)(BookSeat))
