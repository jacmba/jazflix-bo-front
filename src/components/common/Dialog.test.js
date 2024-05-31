import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import Dialog from "./Dialog"

describe('Dialog component', () => {
  
  it('should open dialog modal', () => {
    render(
      <Dialog
        title="Test Dialog"
        text="This is a test dialog" />
    )

    const dialog = screen.queryByTestId('dialog-modal')
    expect(dialog).toBeInTheDocument()

    const title = screen.queryByTestId('dialog-title')
    expect(title).toBeInTheDocument()
    expect(title.innerHTML).toBe('Test Dialog')
    
    const text = screen.queryByTestId('dialog-text')
    expect(text).toBeInTheDocument()
    expect(text.innerHTML).toBe('This is a test dialog')

    const closeBtn = screen.queryByTestId('dialog-close-btn')
    expect(closeBtn).toBeInTheDocument()
    expect(closeBtn).toHaveClass('btn-secondary')

    const acceptBtn = screen.queryByTestId('dialog-accept-btn')
    expect(acceptBtn).toBeInTheDocument()
    expect(acceptBtn).toHaveClass('btn-primary')
    expect(acceptBtn.innerHTML).toBe('Accept')
  })

  it('should render accept button with custom label and class', () => {
    render(
      <Dialog
        acceptCaption="Click here!"
        acceptClass="danger" />
    )

    const button = screen.getByTestId('dialog-accept-btn')
    expect(button).toHaveClass('btn-danger')
    expect(button.innerHTML).toBe('Click here!')
  })

  it('should close dialog when clicking on close button', async () => {
    const callback = jest.fn()

    render(<Dialog cancelCallback={callback} />)

    const button = screen.getByTestId('dialog-close-btn')
    fireEvent.click(button)

    expect(callback).toHaveBeenCalled()
  })

  it('should close dialog and invoke callback when clicking accept', async () => {
    const callback = jest.fn()

    render(<Dialog showDefault={true} acceptCallback={callback} />)

    const button = screen.getByTestId('dialog-accept-btn')
    fireEvent.click(button)

    expect(callback).toHaveBeenCalled()
  })
})