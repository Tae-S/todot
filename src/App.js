// TODO: custom checkbox while displaying todos | Bold Italic text formatting panel | error panel top of the page to display user-friendly messages
import './App.css'

// ADDED: component imports
import Todo from './Components/Todo'
import View from './Components/View'

function App() {
  return (
    <div className="App">
      <h1 style={{'margin':'0.5em'}}>Todot: Track your todos!</h1>
      <Todo />
      <View />
    </div>
  )
}

export default App
