// TODO: window.resize listener to call adjust() and or set app size and app grid-template-rows
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addStyle } from '../features/todoStyles'
import { update } from '../features/todo'
import deleteSmall from '../assests/images-icons/delete-small.png'
import closeSmall from '../assests/images-icons/closeSmall.png'
import { deleteTodo } from '../features/todo'
import pinSmall from '../assests/images-icons/pin-small.png'

const GRID_SIZE = 50
const WRAP_LENGTH = 10
const LAST_ADDED = {index:-1}

function View()
{
    const dispatch = useDispatch()
    const todoList = useSelector(state => state.todo.value)
    const todoStylesList = useSelector(state => state.todostyles.value)
    const [lastAdded, setLastAdded] = useState(todoList.length -1)
    const handleClick = e => {
        localStorage.clear()
        console.assert('Local storage was cleared using admin privileges')
        window.scrollTo(0, 0)
        window.location.reload()
    }
    useEffect(()=>{
        
        adjust()
        setLastAdded(prevState => {
            LAST_ADDED.index = todoList.length
            // console.log(LAST_ADDED)
            return todoList.length
        })
        // adjust(title.length, _in)
        return () => {}
    }, [todoList])

    
    function adjust()
    {
        
        // const items = document.querySelectorAll('.item')
        // console.log(items)
        const app = document.querySelector('.app')
        const body = document.querySelector('body')
        const bodyHeight = getComputedStyle(body).minHeight
        const _items = document.querySelectorAll('.item')
        // console.log(_items)
        console.log(bodyHeight)
        if(_items) _items.forEach((item,_in) => {
            const _input = document.querySelector(`input[data-post="${_in}"]`)
            todoList[_in].isDone?_input.checked = true: _input.checked=false
            if(_in === LAST_ADDED.index){
                // console.log('here', _in, ' will be the data-post')
                const len = Math.max(item.firstChild.textContent.length, item.children[1].textContent.length)
                const ht = parseInt(getComputedStyle(item).height)
                const _height = Math.floor(ht/(12*WRAP_LENGTH))
                // const _width = Math.floor(len/WRAP_LENGTH)
                const _width = Math.floor(len/(2*WRAP_LENGTH))
                // console.warn(_height)
                console.warn(_width, len, ht)
                item.style.gridColumn = `span ${_width+2}`
                item.style.gridRow = `span ${_height}`
                // item.style.maxHeight = `${ht}px`
                item.style.height = 'auto'
                // item.style.height = `${ht}px`
                item.style.minWidth = '200px'
                // item.style.width = 'fit-content'
                todoList[_in].isDone?item.classList.add('do-not'):item.classList.remove('do-not')
                //dispatch the changed style
                dispatch(addStyle({gridColumn: `span ${_width+2}`, gridRow: `span ${_height}`, maxHeight: `${ht}px`, index: lastAdded, minWidth: '200px' }))
            }
            else{
                //load the style here
                const _t = todoStylesList.filter(t =>{
                    return t.index=== _in
                })
                // console.log(_t)
                const { gridColumn, gridRow, maxHeight, minWidth} = _t[0]
                // console.log(gridColumn, gridRow, maxHeight)
                item.style.gridColumn = gridColumn
                item.style.height = 'auto'
                item.style.gridRow = gridRow
                // item.style.maxHeight = maxHeight
                
                item.style.minWidth = '200px'
                // item.style.width = 'fit-content'
                todoList[_in].isDone?item.classList.add('do-not'):item.classList.remove('do-not')
                // console.warn(item)
                // item.style.maxHeight = maxHeight
            }
        })

        if(app){
            app.style.minHeight = bodyHeight
            app.style.gridTemplateRows = `repeat(${Math.floor(parseInt(bodyHeight)/GRID_SIZE)}, 150px)`
            console.log(app.style.gridTemplateRows)
            app.style.maxWidth = `${Math.min(parseInt(getComputedStyle(body).width),625)}px`
        }
        
    }
    const handleDoneClick = e => {
        const _post = e.target.dataset.post
        console.log('toggled on done', _post)
        //dispatch(updateTodo())
        dispatch(update({index:_post}))
        const _item = document.querySelector(`[data-post="${_post}"]`).classList.toggle('do-not')
        // _item.classList.contains('done')? _item.classList.remove('done'):_item.classList.add('done')
    }
    const handleDelete = e => {
        const _post = e.target.dataset.post
        dispatch(deleteTodo({index:_post}))
        
    }
    return(
        <div className='view'>
            <div className='app'>
                {todoList.length === 0?(
                    <p style={{'width': '30em','margin':'auto','position':'relative', 'height':'2em' ,'border':'0px solid black'}}>Nothing to show here, maybe add a task to track!</p>
                ):(
                    todoList.map((t,_in) =>{
                        const { title, description, timestamp, isDone } = t     
                        return(
                            <div className='item' data-post={_in} key={_in} >
                                <p>{ title }</p>
                                <p>{ description }</p>
                                <p>{ timestamp }</p>
                                <div className='item-toolbar'>
                                    <p style={{'fontSize': '0.6rem'}}>{ timestamp }</p>
                                    <input data-post={_in} type='checkbox' onClick={e => handleDoneClick(e)} />
                                    <img className='pin' src={pinSmall} alt='pin' />
                                    <img data-post={_in} className='del' onClick={e => handleDelete(e)} src={deleteSmall} alt='close'/>
                                </div>
                            </div>
                        )
                    })
                )}
            </div>
            <input className='btn admin-clear-btn' type='button' value='admin: clear localStorage' onClick={e => handleClick(e)}/>
        </div>
    )
}


export default View