import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import Sections from "./Sections"
import { useNavigate } from "react-router-dom"
import { deleteSection, retrieveAllSections } from "../../../services/sections-service"

jest.mock('../../../services/sections-service')

jest.mock('react-router-dom')
const navigate = jest.fn()

const verifyIcon = ({children}, expIcon) => {
  const [icon, text] = children

  expect(icon).toHaveAttribute('data-icon', expIcon)
  expect(icon).toHaveClass('iconify')
  expect(text.innerHTML).toBe(expIcon)
}

const verifyCells = (row, {expIcon, expTitle, expTo, expOrder}) => {
  const {children} = row
  const [icon, title, to, order] = children
  expect(title.innerHTML).toBe(expTitle)
  expect(to.innerHTML).toBe(expTo)
  expect(order.innerHTML).toBe(expOrder)

  verifyIcon(icon, expIcon)
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

    deleteSection.mockResolvedValue(true)

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

  it('should display message aler when error on loading sections', async () => {
    retrieveAllSections.mockResolvedValue(false)

    render(<Sections />)

    const alert = await screen.findByTestId('message-alert')
    expect(alert).toHaveClass('alert-danger')
    expect(alert.innerHTML).toContain('There was an error loading sections. Check your logs and try again')

    const {firstChild} = alert
    fireEvent.click(firstChild)

    await waitFor(() => {
      expect(alert).not.toBeInTheDocument()
    })
  })

  it('should display dialog on delete click', async () => {
    render(<Sections />)

    const [deleteHome] = await screen.findAllByTestId('btn-delete-section')
    fireEvent.click(deleteHome)

    const dialog = await screen.findByTestId('dialog-modal')
    const title = screen.getByTestId('dialog-title')
    const text = screen.getByTestId('dialog-text')
    const closeBtn = screen.getByTestId('dialog-close-btn')
    
    expect(title.innerHTML).toBe('Delete section')
    expect(text.innerHTML).toBe('Are you sure you want to delete section Home?')

    fireEvent.click(closeBtn)

    await waitFor(() => {
      expect(dialog).not.toBeInTheDocument()
    })
  })

  it('should delete secion when confirmed', async() => {
    render(<Sections />)

    const [deleteHome] = await screen.findAllByTestId('btn-delete-section')
    const homeCell = screen.queryByText('home-icon')

    expect(homeCell).toBeInTheDocument()

    fireEvent.click(deleteHome)

    const dialog = await screen.findByTestId('dialog-modal')
    const button = screen.getByTestId('dialog-accept-btn')
    fireEvent.click(button)

    expect(deleteSection).toHaveBeenCalledWith('abc1')

    const alert = await screen.findByTestId('message-alert')
    expect(alert).toHaveClass('alert-success')
    expect(alert.innerHTML).toContain('Section Home successfully deleted')

    expect(dialog).not.toBeInTheDocument()

    const rows = await screen.findAllByTestId('section-table-row')
    expect(rows).toHaveLength(2)
    expect(homeCell).not.toBeInTheDocument()
  })
})