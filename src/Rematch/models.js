import gql from 'graphql-tag'
import * as hihi from '../Components/Apollo'
const moment = require('moment')
// import { notify } from 'react-notify-toast'
export const root = {
  state: {
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    current: 'settingrooms',
    pen: 'seat',
    roomname: '',
    width: 8,
    length: 10,
    map: [],
    listroom: [],
    pickroom: '',
    pickdate: '',
    picktime: ''
  },
  reducers: {
    handleChangeCustom (state, key, value) {
      return {
        ...state,
        [key]: value
      }
    },
    handleChange (state, e) {
      return {
        ...state,
        [e.target.name]: e.target.value
      }
    },
    handleClickMenu (state, e) {
      return {
        ...state,
        current: e.key
      }
    },
    handleClickSwap (state, e) {
      return {
        ...state,
        pen: e.target.name
      }
    },
    resetLogin (state, payload) {
      return {
        ...state,
        current: payload
      }
    },
    initMap (state) {
      let log = []
      if (state.roomname !== '') {
        for (let i = 0; i < state.length; i++) {
          let row = []
          for (let j = 0; j < state.width; j++) {
            row.push({
              color: '#3498db'
            })
          }
          log.push(row)
        }
      }
      return {
        ...state,
        map: log
      }
    },
    resetMap (state) {
      return {
        ...state,
        map: []
      }
    },
    handleClickSeat (state, e) {
      let id = e.target.id.split('-')
      let log = [...state.map]
      if (state.pen === 'seat') {
        if (log[id[0]][id[1]].color === '#3498db') log[id[0]][id[1]].color = '#2ecc71'
        else log[id[0]][id[1]].color = '#3498db'
      } else {
        if (log[id[0]][id[1]].color === '#2ecc71') log[id[0]][id[1]].color = '#e74c3c'
        else if (log[id[0]][id[1]].color === '#e74c3c') log[id[0]][id[1]].color = '#2ecc71'
      }
      return {
        ...state,
        map: log
      }
    },
    setListRoom (state, payload) {
      return {
        ...state,
        listroom: payload
      }
    },
    setColor (state, pos, color) {
      let log = [...state.map]
      log[pos.x][pos.y].color = color
      return {
        ...state,
        map: log
      }
    },
    setTimestamp (state, pos, time) {
      let log = [...state.map]
      log[pos.x][pos.y].timestamp = time
      return {
        ...state,
        map: log
      }
    },
    setIdSchedule (state, pos, _id) {
      let log = [...state.map]
      log[pos.x][pos.y].idschedule = _id
      return {
        ...state,
        map: log
      }
    }
  },
  effects: (dispatch) => ({
    async onLogin (payload, rootState) {
      // hihi.Client.mutate({
      //   variables: {
      //     name: rootState.root.username,
      //     password: rootState.root.password,
      //     firstname: rootState.root.firstname,
      //     lastname: rootState.root.lastname,
      //     isEnabled: true
      //   },
      //   mutation: gql`
      //     mutation addUser ($name: String!, $password: String, $imageUrl: String, $firstname: String, $lastname: String, $isEnabled: Boolean!) {
      //       addUser (name: $name, password: $password, imageUrl: $imageUrl, firstname: $firstname, lastname: $lastname, isEnabled: $isEnabled) {
      //         _id
      //       }
      //     }
      //   `
      // }).then((result) => {
      //   console.log(result)
      // })
      payload.replace('/DHS')
      // payload.replace('/admin')
    },
    async onRegister (payload, rootState) {
    },
    async onComplete (payload, rootState) {
      // add room
      await hihi.Client.mutate({
        variables: {
          code: `lol`,
          name: rootState.root.roomname,
          width: rootState.root.width,
          length: rootState.root.length,
          isEnabled: true
        },
        mutation: gql`
          mutation addRoom ($code: String!, $name: String, $width: Int!, $length: Int!, $isEnabled: Boolean!) {
            addRoom (code: $code, name: $name, width: $width, length: $length, isEnabled: $isEnabled) {
              _id code name
            }
          }
        `
      }).then(function (result) {
        let tmp = [...rootState.root.listroom]
        tmp.push(result.data.addRoom.name)
        dispatch.root.setListRoom(tmp)

        let id = result.data.addRoom._id
        let code = result.data.addRoom.code
        for (let i = 0; i < rootState.root.length; i++) {
          for (let j = 0; j < rootState.root.width; j++) {
            if (rootState.root.map[i][j].color !== '#3498db') {
              hihi.Client.mutate({
                variables: {
                  code: `${code}_s_${i}_${j}`,
                  x: i,
                  y: j,
                  isEnabled: true,
                  state: rootState.root.map[i][j].color === '#2ecc71' ? 1 : 2,
                  roomId: id
                },
                mutation: gql`
                  mutation addSeat ($code: String!, $x: Int!, $y: Int!, $state: Int, $isEnabled: Boolean!, $roomId: String!) {
                    addSeat (code: $code, x: $x, y: $y, state: $state, isEnabled: $isEnabled, roomId: $roomId) {
                      code _id
                    }
                  }
                `
              })
            }
          }
        }
      })
    },
    async getListroom (payload, rootState) {
      let lr = []
      await hihi.Client.query({
        query: gql`
          {
            getRooms {
              name
            }
          }
        `
      }).then(function (result) {
        lr = result.data.getRooms
      })
      let log = lr.map(v => {
        return v.name
      })
      dispatch.root.setListRoom(log)
    },
    async getRooms (payload, rootState) {
      await hihi.Client.query({
        query: gql`
          {
            getRooms {
              name width length
              seats {
                x y isEnabled state _id
              }
            }
          }
        `
      }).then(function (result) {
        let log = {}
        for (let v of result.data.getRooms) {
          if (v.name === rootState.root.pickroom) log = v
        }
        dispatch.root.handleChangeCustom('width', log.width)
        dispatch.root.handleChangeCustom('length', log.length)
        let cc = []
        for (let i = 0; i < log.length; i++) {
          let row = []
          for (let j = 0; j < log.width; j++) {
            row.push({
              color: '#3498db',
              id: '',
              timestamp: '',
              idschedule: ''
            })
          }
          cc.push(row)
        }
        for (let v of log.seats) {
          cc[v.x][v.y].color = v.state === 1 ? '#2ecc71' : '#e74c3c'
          cc[v.x][v.y].id = v._id
        }
        dispatch.root.handleChangeCustom('map', cc)
      })
    },
    async PickSeat (payload, rootState) {
      let date = rootState.root.pickdate.split('-')
      let c = null
      if (payload.split('|')[2] === 'AM') {
        c = moment().set({
          'date': +date[0],
          'month': +date[1] - 1,
          'year': +date[2],
          'hour': 8,
          'minute': 30
        })
      } else if (payload.split('|')[2] === 'PM') {
        c = moment().set({
          'date': +date[0],
          'month': +date[1] - 1,
          'year': +date[2],
          'hour': 13,
          'minute': 30
        })
      } else {
        c = moment().set({
          'date': +date[0],
          'month': +date[1] - 1,
          'year': +date[2],
          'hour': 17,
          'minute': 30
        })
      }
      await hihi.Client.mutate({
        variables: {
          seatId: payload.split('|')[1],
          userId: 'tuan',
          timestamp: c.unix()
        },
        mutation: gql`
          mutation addSchedule ($seatId: String!, $userId: String!, $timestamp: Int!) {
            addSchedule (seatId: $seatId, userId: $userId, timestamp: $timestamp) {
              _id timestamp
              room {
                name
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
      }).then(function (result) {
        // // console.log(result)
        // let data = result.data.addSchedule
        // // console.log(result.data.addSchedule)
        // let time = moment(data.timestamp * 1000).format('DD-MM-YYYY|HH-mm').split('|')
        // dispatch.root.setColor({x: data.seat.x, y: data.seat.y}, '#e67e22')
        // dispatch.root.setTimestamp({x: data.seat.x, y: data.seat.y}, time[1])
        // dispatch.root.setIdSchedule({x: data.seat.x, y: data.seat.y}, data._id)
        try {
          // console.log(result)
          let data = result.data.addSchedule
          // console.log(result.data.addSchedule)
          let time = moment(data.timestamp * 1000).format('DD-MM-YYYY|HH-mm').split('|')
          dispatch.root.setColor({x: data.seat.x, y: data.seat.y}, '#e67e22')
          dispatch.root.setTimestamp({x: data.seat.x, y: data.seat.y}, time[1])
          dispatch.root.setIdSchedule({x: data.seat.x, y: data.seat.y}, data._id)
        } catch (e) {}
      })
    },
    async AsnycRoom (payload, rootState) {
      await hihi.Client.query({
        query: gql`
          {
            getSchedules {
              _id timestamp
              room {
                name
              }
              user {
                _id name
              }
              seat {
                x y state
              }
            }
          }
        `
      }).then(function (result) {
        let data = result.data.getSchedules
        for (let v of data) {
          let time = moment(v.timestamp * 1000).format('DD-MM-YYYY|HH-mm').split('|')
          if (v.room.name === rootState.root.pickroom && time[0] === rootState.root.pickdate) {
            let cc = [...rootState.root.map]
            cc[v.seat.x][v.seat.y].color = '#e67e22'
            cc[v.seat.x][v.seat.y].timestamp = time[1]
            cc[v.seat.x][v.seat.y].idschedule = v._id
            dispatch.root.handleChangeCustom('map', cc)
          }
        }
      })
    },
    async AsyncRemoveSeat (payload, rootState) {
      await hihi.Client.mutate({
        variables: {
          _id: payload
        },
        mutation: gql`
          mutation deleteSchedule ($_id: ID!) {
            deleteSchedule (_id: $_id) {
              _id
            }
          }
        `
      }).then(function (result) {
      })
    }
  })
}
