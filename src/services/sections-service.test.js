import axios from "axios"
import {
  createSection,
  deleteSection,
  retrieveAllSections,
  retrieveSingleSection,
  updateSection
} from "./sections-service"
import { API_URL } from "../config"

jest.mock('axios')

describe('Sections service', () => {

  beforeEach(() => {
    axios.get.mockResolvedValue({data: [
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
    ]})

    axios.post.mockResolvedValue({data: {
      id: 'xyz789',
      icon: 'test-icon',
      title: 'Test Section',
      to: '/sections/test',
      order: 999
    }})

    axios.put.mockImplementation(jest.fn())

    axios.delete.mockImplementation(jest.fn())

    jest.spyOn(console, 'error').mockImplementation(jest.fn())
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should get all sections when calling retrieveAllSections', async () => {
    const sections = await retrieveAllSections()

    expect(sections).not.toBeUndefined()
    expect(sections).not.toBeNull()
    expect(sections).toHaveLength(3)

    expect(sections[0]).toStrictEqual({
      "id": "abc1",
      "icon": "home-icon",
      "title": "Home",
      "to": "/",
      "order": 1
    })

    expect(sections[1]).toStrictEqual({
      "id": "abc2",
      "icon": "movies-icon",
      "title": "Movies",
      "to": "/sections/movies",
      "order": 2
    })

    expect(sections[2]).toStrictEqual({
      "id": "abc3",
      "icon": "series-icon",
      "title": "Series",
      "to": "/sections/series",
      "order": 3
    })
  })

  it('should return false when calling retrieveAllSections on error', async () => {
    axios.get.mockRejectedValue('Some server error')

    const sections = await retrieveAllSections()
    expect(sections).toBeFalsy()
    expect(console.error).toHaveBeenCalledWith('Some server error')
  })

  it('should return home section when retrieving single section abc1', async () => {
    axios.get.mockResolvedValue({data: {
      "id": "abc1",
      "icon": "home-icon",
      "title": "Home",
      "to": "/",
      "order": 1
    }})

    const section = await retrieveSingleSection('abc1')

    expect(section).not.toBeUndefined()
    expect(section).not.toBeNull()
    expect(section.id).toBe('abc1')
    expect(section.icon).toBe('home-icon')
    expect(section.title).toBe('Home')
    expect(section.to).toBe('/')
    expect(section.order).toBe(1)
  })

  it('should return false when section is not found', async () => {
    axios.get.mockRejectedValue('Section [xyz] not found')

    const section = await retrieveSingleSection('xyz')
    expect(section).toBeFalsy()
    expect(console.error).toHaveBeenCalledWith('Section [xyz] not found')
  })

  it('should return created object when posting new section', async () => {
    const input = {
      icon: 'test-icon',
      title: 'Test Section',
      to: '/sections/test',
      order: 999
    }

    const result = await createSection(input)

    expect(result).not.toBeUndefined()
    expect(result).not.toBeNull()
    expect(result.id).toBe('xyz789')
    expect(result.icon).toBe('test-icon')
    expect(result.title).toBe('Test Section')
    expect(result.to).toBe('/sections/test')
    expect(result.order).toBe(999)
  })

  it('should return false when creating a section with validation errors', async () => {
    axios.post.mockRejectedValue('Some validation error')

    const result = await createSection({})
    expect(result).toBeFalsy()
    expect(console.error).toHaveBeenCalledWith('Some validation error')
  })

  it('should return true on successful section update', async () => {
    const result = await updateSection({id: 'abc123'})
    expect(axios.put).toHaveBeenCalledWith(API_URL + '/section/abc123', {
      id: 'abc123'
    })
    expect(result).toBeTruthy()
  })

  it('should return false on non existing section update', async () => {
    axios.put.mockRejectedValue('Section [xyz789] not found')

    const result = await updateSection({id: 'xyz789'})
    expect(axios.put).toHaveBeenCalledWith(API_URL + '/section/xyz789', {
      id: 'xyz789'
    })
    expect(result).toBeFalsy()
    expect(console.error).toHaveBeenCalledWith('Section [xyz789] not found')
  })

  it('should return true on delete section', async () => {
    const result = await deleteSection('abc123')
    expect(axios.delete).toHaveBeenCalledWith(API_URL + '/section/abc123')
    expect(result).toBeTruthy()
  })

  it('should return false on delete section error', async () => {
    axios.delete.mockRejectedValue('Section [xyz789] not found')
    
    const result = await deleteSection('xyz789')
    expect(axios.delete).toHaveBeenCalledWith(API_URL + '/section/xyz789')
    expect(result).toBeFalsy()
    expect(console.error).toHaveBeenCalledWith('Section [xyz789] not found')
  })
})