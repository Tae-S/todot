import { useEffect, useState } from "react"
import { useDispatch } from 'react-redux'
import { addStyle } from '../features/todoStyles'
import { post } from '../features/todo'

const GRID_SIZE = 50
const WRAP_LENGTH = 6

function Todo()
{
    const dispatch = useDispatch()
    const [values, setValues] = useState({
        title: '',
        description: '',
        x: 0,
        y: 0
    })
    const handleChange = e => {
        const _field = e.target.name
        setValues(prevState => {
            if(_field === 'title') return {...prevState, title: e.target.value}
            else return {...prevState, description: e.target.value}
        })
    }
    const handleSubmit = e => {
        e.preventDefault()
        console.log(values)
        // dispatch(addStyle({gridColumn: `span ${_width+2}`, gridRow: `span ${_height}`, maxHeight: `${ht}px`, index: _in }))
        const len = values.title.length
        const _width = Math.floor(len/WRAP_LENGTH)
        const _height = '100%'
        try{
            dispatch(post({title: values.title, description: values.description, isDone: false, timestamp: new Date().toLocaleString()}))
            // dispatch(addStyle({gridColumn: `span ${_width+2}`, x: values.x, y: values.y}))
            console.log('dispatched successfully')
        }catch(err){
            console.log('Dipatch failed', err)
        }
        setValues({
            title: '',
            description: '',
            x: 0,
            y: 0
        })
        // window.location.reload()
        // const todo = document.querySelector('.todo-form')
        // todo.style.pointerEvents = 'none'
        // todo.style.visibility = 'hidden'
        // todo.style.userSelect = 'none'
    }
    // useEffect(()=> {
    //     const view = document.querySelector('.view')
    //     const todo = document.querySelector('.todo-form')
    //     todo.style.pointerEvents = 'none'
    //     todo.style.visibility = 'hidden'
    //     todo.style.userSelect = 'none'
    //     view.addEventListener('click', (e) => {
    //         const _x = e.clientX
    //         const _y = e.clientY
    //         console.log('clicked', _x, _y)
    //         const todo = document.querySelector('.todo-form')
    //         todo.style.pointerEvents = 'all'
    //         todo.style.visibility = 'visible'
    //         setValues(prevState => {
    //             return {...prevState, x:_x, y:_y}
    //         })
    //     })
    // }, [])
    return(
        <form className="todo-form" action='/' method="POST" onSubmit={e => handleSubmit(e)}>
            <input type='text' name='title' onChange={e => handleChange(e)} placeholder='title...' value={ values.title }/>
            <input type='text' name='description' onChange={e => handleChange(e)} placeholder='to-do...' value={ values.description }/>
            <input className="btn" type='submit' value='add item' onSubmit={e => handleSubmit(e)}/>
        </form>
    )
}

export default Todo