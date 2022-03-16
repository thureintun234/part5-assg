import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  test('render title and author', () => {
    let container
    const blog = {
      title: 'testing blog test',
      author: 'shadow'
    }

    container = render(<Blog blog={blog} />).container

    let body = container.querySelector('.blogDiv')

    expect(body).toHaveTextContent('testing blog test')
  })

  test('when button clicked, url and likes appear', () => {
    let container
    const blog = {
      title: 'testing blog test',
      author: 'shadow',
      url: 'http://www.google.com',
      likes: 8
    }

    container = render(<Blog blog={blog} />).container

    let button = screen.getByText('view')
    userEvent.click(button)

    let element = container.querySelector('.blogDetails')

    expect(element).toHaveTextContent('http://www.google.com')

  })
})