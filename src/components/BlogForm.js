import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [blog, setBlog] = useState({
    title: '',
    author: '',
    url: ''
  })

  const onAddBlog = e => {
    e.preventDefault()

    createBlog(blog)
    setBlog({ ...blog, title: '', author: '', url: '' })
  }

  return (
    <div className='formDiv'>
      <form onSubmit={onAddBlog}>
        <h2>create new</h2>
        <div>
          title <input value={blog.title} onChange={(e) => setBlog({ ...blog, title: e.target.value })} />
        </div>
        <div>
          author <input value={blog.author} onChange={(e) => setBlog({ ...blog, author: e.target.value })} />
        </div>
        <div>
          url <input type='url' value={blog.url} onChange={(e) => setBlog({ ...blog, url: e.target.value })} />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default BlogForm