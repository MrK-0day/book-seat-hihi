import gql from 'graphql-tag'
import * as hihi from '../Components/Apollo'
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
  })
}
