// import gql from 'graphql-tag'
// import * as hihi from '../Components/Apollo'
// import { notify } from 'react-notify-toast'
export const root = {
  state: {
    username: '',
    password: '',
    firstname: '',
    lastname: ''
  },
  reducers: {
    handleChange (state, e) {
      return {
        ...state,
        [e.target.name]: e.target.value
      }
    }
  },
  effects: (dispatch) => ({
    async onLogin (payload, rootState) {
      payload.replace('/register')
    },
    async onRegister (payload, rootState) {
    }
  })
}
