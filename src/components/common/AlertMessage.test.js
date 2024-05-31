import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import AlertMessage from "./AlertMessage"

describe('AlertMessage component', () => {

  it('Should render component with default params', () => {
    render(<AlertMessage />)

    const alert = screen.queryByTestId('message-alert')
    expect(alert).toBeInTheDocument()
    expect(alert).toHaveClass('alert-primary')
  })

  it('Should render component with given params', () => {
    render(<AlertMessage variant="danger" />)

    const alert = screen.getByTestId('message-alert')
    expect(alert).toHaveClass('alert-danger')
  })

  it('Should have text as child', () => {
    render(<AlertMessage>
      Lorem ipsum dolor sit amet.
    </AlertMessage>)

    const alert = screen.getByTestId('message-alert')
    expect(alert.innerHTML).toContain('Lorem ipsum dolor sit amet.')
  })

  it('Should invoke callback on close', async () => {
    const callback = jest.fn()

    render(<AlertMessage closeCallback={callback} />)

    const {firstChild} = screen.getByTestId('message-alert')
    fireEvent.click(firstChild)

    await waitFor(() => {
      expect(callback).toHaveBeenCalled()
    })
  })
})