import { createSlice } from '@reduxjs/toolkit'
import { postAuth } from '../utils/auth'

let initial = null
try{
    initial = JSON.parse(localStorage.getItem('todo'))
}catch(err){
    console.log('Error Occurred', err)
}

initial = initial === null? [] : initial

export const todoSlice = createSlice({
    name: 'todo',
    initialState: { value: Object.keys(initial).length === 0? []: initial},
    reducers: {
        post: (state, action) => {
            //auth the post and add the todo
            const valid = postAuth(action.payload)
            if(valid){
                state.value.push(action.payload)
                localStorage.setItem('todo', JSON.stringify(state.value))
            }
            else{
                console.log('Title cannot be empty')
            }
        },
        update: (state, action) => {
            state.value.map((v,_in) => {
                // console.warn(_in, action.payload.index)
                if(_in == action.payload.index){
                    v.isDone = !v.isDone
                    // const _item = document.querySelector(`[data-post="${action.payload.index}"]`)
                    // _item.classList.toggle('done')
                    // console.log('here', v)
                    localStorage.setItem('todo',JSON.stringify(state.value))
                }
            })
        },
        deleteTodo: (state, action) => {
            state.value = state.value.filter((v,_in) => _in != action.payload.index)
            localStorage.setItem('todo',JSON.stringify(state.value))
        }
    }
})

export const { post, update, deleteTodo } = todoSlice.actions
export default todoSlice.reducer