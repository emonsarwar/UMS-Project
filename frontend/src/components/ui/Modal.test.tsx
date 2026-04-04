import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Modal from './Modal'

describe('Modal Component', () => {
  const mockOnClose = vi.fn()

  it('renders modal when open', () => {
    render(
      <BrowserRouter>
        <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
          <p>Test Content</p>
        </Modal>
      </BrowserRouter>,
    )

    expect(screen.getByText('Test Content')).toBeInTheDocument()
    expect(screen.getByText('Test Modal')).toBeInTheDocument()
  })

  it('does not render modal when closed', () => {
    const { container } = render(
      <BrowserRouter>
        <Modal isOpen={false} onClose={mockOnClose} title="Test Modal">
          <p>Test Content</p>
        </Modal>
      </BrowserRouter>,
    )

    expect(container.querySelector('[role="dialog"]')).not.toBeInTheDocument()
  })

  it('calls onClose when close button is clicked', async () => {
    render(
      <BrowserRouter>
        <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
          <p>Test Content</p>
        </Modal>
      </BrowserRouter>,
    )

    const closeButton = screen.getByText(/close/i, { selector: 'button' })
    fireEvent.click(closeButton)

    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalled()
    })
  })
})
