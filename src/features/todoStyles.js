import { createSlice } from '@reduxjs/toolkit'

let initial = null
try{
    initial = JSON.parse(localStorage.getItem('todostyles'))
}catch(err){
    console.log('Error Occurred', err)
}

initial = initial === null? []: initial

export const todoStylesSlice = createSlice({
    name: 'todostyles',
    initialState: { value: Object.keys(initial).length===0?[]:initial },
    reducers: {
        addStyle: (state, action) => {
            //set the style
            state.value.push(action.payload)
            localStorage.setItem('todostyles', JSON.stringify(state.value))
        }
    }
})

export const { addStyle } = todoStylesSlice.actions
export default todoStylesSlice.reducer