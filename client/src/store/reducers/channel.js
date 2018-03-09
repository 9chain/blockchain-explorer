import { handleActions } from 'redux-actions'
import { Record } from 'immutable'
import * as actionTypes from '../actions/action-types'

const InitialState = new Record({
    fetching: false,
    loaded: false,
    channel: {},
    error: {},

})


const channel = handleActions({
    [actionTypes.CHANNEL]: (state = InitialState(), action) => state
        .set('loaded', true)
        .set('channel', action.payload)
        .set('errors', action.error),
}, new InitialState())

export default channel