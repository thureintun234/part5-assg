import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Toggable from './components/Toggable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({
    message: null,
    style: 'red'
  })

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const userJSON = window.localStorage.getItem('loginToken')

    if (userJSON) {
      const user = JSON.parse(userJSON)
      setUser(user)
    }
  }, [])

  const onLogin = async (e) => {
    e.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      blogService.setToken(user.token)

      window.localStorage.setItem('loginToken', JSON.stringify(user))

      setUser(user)
      setUsername('')
      setPassword('')
      setNotification({
        ...notification, message: 'Login Successful', style: 'green'
      })
      setTimeout(() => {
        setNotification({ ...notification, message: null })
      }, 4000)
    } catch (error) {
      setNotification({ ...notification, message: error.message })
      setTimeout(() => {
        setNotification({ ...notification, message: null })
      }, 4000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loginToken')
    setUser(null)
  }

  const onAddBlog = async (blog) => {
    try {
      const newBlog = await blogService.create(blog)
      setBlogs(blogs.concat(newBlog))
      setNotification({
        ...notification, message: `a new blog ${newBlog.title} by ${newBlog.author} added`,
        style: 'green'
      })
      setTimeout(() => {
        setNotification({ ...notification, message: null })
      }, 4000)
    } catch (error) {
      setNotification({
        ...notification, message: error.message
      })
      setTimeout(() => {
        setNotification({ ...notification, message: null })
      }, 4000)
    }
  }

  const increaseLike = async (id) => {
    const blog = blogs.find(b => b.id === id)
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    const newUpdatedBlog = await blogService.update(id, updatedBlog)
    setBlogs(blogs.map(b => b.id === id ? newUpdatedBlog : b))
  }

  const deleteBlog = async (id) => {
    const blog = blogs.find(b => b.id === id)
    const willDeleteBlog = window.confirm(`Removing ${blog.title} by ${blog.author}`)
    if (willDeleteBlog) {
      await blogService.remove(id)
      setBlogs(blogs.filter(b => b.id !== id))
    }
    return
  }

  const blogForm = () => {
    return (
      <>
        <Toggable buttonLabel='new blog'>
          <BlogForm createBlog={onAddBlog} />
        </Toggable>
        {
          blogs.map(blog =>
            <Blog key={blog.id} blog={blog} name={user.name} increaseLike={increaseLike}
              deleteBlog={deleteBlog} />
          )
        }
      </>
    )
  }

  const loginForm = () => {
    return (
      <div>
        <h2>log in to application</h2>
        <form onSubmit={onLogin}>
          <div>
            username <input value={username} onChange={({ target }) => setUsername(target.value)} />
          </div>
          <div>
            password <input type='password' value={password} onChange={({ target }) => setPassword(target.value)} />
          </div>
          <button type='submit'>login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      {notification.message && <Notification message={notification.message} style={notification.style} />}
      {
        user === null ?
          loginForm() :
          <div>
            <h2>blogs</h2>
            <p>
              {user.name} logged in
              <button onClick={handleLogout}>logout</button>
            </p>
            {blogForm()}
          </div>
      }
    </div>
  )
}

export default App