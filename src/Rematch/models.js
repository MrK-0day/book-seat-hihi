// import gql from 'graphql-tag'
// import * as hihi from '../Components/Apollo'
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
    map: []
  },
  reducers: {
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
    }
  },
  effects: (dispatch) => ({
    async onLogin (payload, rootState) {
      payload.replace('/admin')
    },
    async onRegister (payload, rootState) {
    }
  })
}
