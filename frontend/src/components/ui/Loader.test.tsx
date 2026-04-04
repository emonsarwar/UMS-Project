import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Loader from './Loader'

describe('Loader Component', () => {
  it('renders loader with spinner', () => {
    render(
      <BrowserRouter>
        <Loader />
      </BrowserRouter>,
    )

    const loaderElement = screen.getByRole('status')
    expect(loaderElement).toBeInTheDocument()
  })

  it('has loading text', () => {
    render(
      <BrowserRouter>
        <Loader />
      </BrowserRouter>,
    )

    const loadingText = screen.getByText(/loading/i)
    expect(loadingText).toBeInTheDocument()
  })
})
