import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  test('create a new blog', () => {
    const createBlog = jest.fn()

    render(<BlogForm createBlog={createBlog} />)

    let input = screen.getAllByRole('textbox')
    let button = screen.getByText('create')

    userEvent.type(input[0], 'testing blog form')
    userEvent.click(button)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('testing blog form')
  })
})