import { render } from "@testing-library/react"
import Home from "./Home"

jest.mock('react-router-dom')

describe('Home', () => {

  it('Should render Home component', () => {
    render(<Home />)
  })
})