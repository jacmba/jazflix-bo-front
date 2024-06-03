import { render, screen } from "@testing-library/react"
import SectionForm from "./SectionForm"

describe('Section Form', () => {

  it('should render form container', () => {
    render(<SectionForm />)

    const container = screen.queryByTestId('section-form-container')
    expect(container).toBeInTheDocument()
    expect(container).toHaveClass('container')
    expect(container).toHaveClass('mt-5')
  })
})