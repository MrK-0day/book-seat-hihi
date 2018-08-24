import React, { Component } from 'react'
import { withCookies } from 'react-cookie'
import { connect } from 'react-redux'
import Notifications from 'react-notify-toast'
import { Subscription } from 'react-apollo'
import gql from 'graphql-tag'

import Menuy from './Children/Menuy'

class DHS extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  render () {
    return (
      <div>
        <Menuy />
        <Subscription subscription={gql`
          subscription Schedule {
            scheduleUpdate {
              _id roomId seatId userId timestamp
              room {
                code
              }
              seat {
                code
              }
            }
          }
        `}>
          {(data) => {
            console.log(data)
            return <div>1</div>
          }}
        </Subscription>
        <Notifications />
      </div>
    )
  }
}

const mapState = state => { return state.root }

const mapDispatch = dispatch => { return dispatch.root }

export default withCookies(connect(mapState, mapDispatch)(DHS))
