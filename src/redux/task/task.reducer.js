const INITIAL_STATE={
    items:[],
    inputval:{},
    newinputval:{}

    
}

const TaskReducer=(state=INITIAL_STATE,action)=>{
    switch(action.type){

        case'editval':

        Object.assign(state.inputval,action.value)

        case'editoldval':

        Object.assign(state.newinputval,action.value)

        // return{
        //     ...state,
        //    inputval:action.value
           
        // };
           
 
     
       


              

            default:
                return state

    }
}

export default TaskReducer