import {useState, useEffect} from 'react'
import axios from 'axios'
import Nav from './components/Nav'


const App = () => {

// =========== States ================= //

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

// =========== useEffect =========== //

// ========== Form Functions ============ //

  const handleNewName = (event) => {
    setName(event.target.value)
  }

  const handleNewDescription = (event) => {
    setDescription(event.target.value)
  }

// =========== Post Function ============ //



// =========== Browser =========== //

  return (
    <>
      <header>

      </header>
      <h1>JargIN</h1>
      <section>
        {/* <form onSubmit={handleNewPostSubmit}> */}
        <form>
          <p>Name: </p><input type="text" onChange={handleNewName}/><br/>
          <p>Description: </p><textarea name="post-submit" onChange={handleNewDescription}></textarea><br/>
        </form>
      </section>
      <footer>
        <Nav />
      </footer>
    </>
  )
}

export default App;
