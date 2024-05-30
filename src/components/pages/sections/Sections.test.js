import { render, screen } from "@testing-library/react"
import Sections from "./Sections"
import { useNavigate } from "react-router-dom"
import { retrieveAllSections } from "../../../services/sections-service"

jest.mock('../../../services/sections-service')

jest.mock('react-router-dom')
const navigate = jest.fn()

const verifyCells = (row, {expIcon, expTitle, expTo, expOrder}) => {
  const {children} = row
  const [icon, title, to, order] = children
  expect(icon.innerHTML).toBe(expIcon)
  expect(title.innerHTML).toBe(expTitle)
  expect(to.innerHTML).toBe(expTo)
  expect(order.innerHTML).toBe(expOrder)
}

describe('Sections', () => {

  beforeEach(() => {
    retrieveAllSections.mockResolvedValue([
      {
        "id": "abc1",
        "icon": "home-icon",
        "title": "Home",
        "to": "/",
        "order": 1
      },
      {
        "id": "abc2",
        "icon": "movies-icon",
        "title": "Movies",
        "to": "/sections/movies",
        "order": 2
      },
      {
        "id": "abc3",
        "icon": "series-icon",
        "title": "Series",
        "to": "/sections/series",
        "order": 3
      }
    ])

    useNavigate.mockImplementation(() => navigate)
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should have main container', () => {
    render(<Sections />)

    const container = screen.queryByTestId('sections-list-container')
    expect(container).toBeInTheDocument()
    expect(container).toHaveClass('container')
    expect(container).toHaveClass('mt-5')

    const {firstChild} = container
    expect(firstChild.innerHTML).toBe('List of Jazflix sections')
  })

  it('should have rows for each section', async () => {
    render(<Sections />)

    expect(retrieveAllSections).toHaveBeenCalledTimes(1)

    const rows = await screen.findAllByTestId('section-table-row')
    expect(rows).toHaveLength(3)

    const [home, movies, series] = rows

    verifyCells(home, {
      "expIcon": "home-icon",
      "expTitle": "Home",
      "expTo": "/",
      "expOrder": '1'
    })

    verifyCells(movies, {
      "expIcon": "movies-icon",
      "expTitle": "Movies",
      "expTo": "/sections/movies",
      "expOrder": '2'
    })

    verifyCells(series, {
      "expIcon": "series-icon",
      "expTitle": "Series",
      "expTo": "/sections/series",
      "expOrder": '3'
    })
  })
})