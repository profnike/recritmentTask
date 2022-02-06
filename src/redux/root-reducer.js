import {combineReducers} from 'redux'
import TaskReducer from './task/task.reducer'

export default combineReducers({
   task: TaskReducer,
    
})