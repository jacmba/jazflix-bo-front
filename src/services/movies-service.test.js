import axios from "axios"
import { createMovie, deleteMovie, retrieveAllMovies, retrieveSingleMovie, updateMovie } from "./movies-service"
import { API_URL } from "../config"

jest.mock('axios')

describe('Movies Service', () => {

  beforeEach(() => {
    axios.get.mockResolvedValue({data: [
      {
        "id": "61e81",
        "title": "Mi test movie",
        "description": "a test movie",
        "image": "http://foo.bar/test.jpg",
        "video": "test.mp4",
        "extra": "movies,awesome"
      },
      {
        "id": "61e82",
        "title": "Mi test movie 2",
        "description": "another test movie",
        "image": "http://foo.bar/test.jpg",
        "video": "test.mp4",
        "extra": "movies,awesome"
      }
    ]})

    axios.post.mockResolvedValue({data: {
      "id": "61e81",
      "title": "Mi test movie",
      "description": "a test movie",
      "image": "http://foo.bar/test.jpg",
      "video": "test.mp4",
      "extra": "movies,awesome"
    }})

    axios.put.mockImplementation(jest.fn())

    axios.delete.mockImplementation(jest.fn())

    jest.spyOn(console, 'error')
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should return list of movies', async () => {
    const result = await retrieveAllMovies()

    expect(axios.get).toHaveBeenCalledWith(API_URL + '/movies')
    expect(result).toHaveLength(2)
    
    const [movie1, movie2] = result

    expect(movie1).toStrictEqual({
      "id": "61e81",
      "title": "Mi test movie",
      "description": "a test movie",
      "image": "http://foo.bar/test.jpg",
      "video": "test.mp4",
      "extra": "movies,awesome"
    })

    expect(movie2).toStrictEqual({
      "id": "61e82",
      "title": "Mi test movie 2",
      "description": "another test movie",
      "image": "http://foo.bar/test.jpg",
      "video": "test.mp4",
      "extra": "movies,awesome"
    })
  })

  it('should return false on error when retrieving all movies', async () => {
    axios.get.mockRejectedValue('Some server error')

    const result = await retrieveAllMovies()

    expect(axios.get).toHaveBeenCalledWith(API_URL + '/movies')
    expect(result).toBeFalsy()
    expect(console.error).toHaveBeenCalledWith('Some server error')
  })

  it('should return single movie', async () => {
    axios.get.mockResolvedValue({data: {
      "id": "61e81",
      "title": "Mi test movie",
      "description": "a test movie",
      "image": "http://foo.bar/test.jpg",
      "video": "test.mp4",
      "extra": "movies,awesome"
    }})

    const movie = await retrieveSingleMovie('61e81')

    expect(axios.get).toHaveBeenCalledWith(API_URL + '/movies/61e81')
    expect(movie).toStrictEqual({
      "id": "61e81",
      "title": "Mi test movie",
      "description": "a test movie",
      "image": "http://foo.bar/test.jpg",
      "video": "test.mp4",
      "extra": "movies,awesome"
    })
  })

  it('should return false on error when retrieving single movie', async () => {
    axios.get.mockRejectedValue('Movie not found')

    const result = await retrieveSingleMovie('123')

    expect(axios.get).toHaveBeenCalledWith(API_URL + '/movies/123')
    expect(result).toBeFalsy()
    expect(console.error).toHaveBeenCalledWith('Movie not found')
  })

  it('should create new movie', async () => {
    const result = await createMovie({
      "title": "Mi test movie",
      "description": "a test movie",
      "image": "http://foo.bar/test.jpg",
      "video": "test.mp4",
      "extra": "movies,awesome"
    })

    expect(axios.post).toHaveBeenCalledWith(API_URL + '/movies', {
      "title": "Mi test movie",
      "description": "a test movie",
      "image": "http://foo.bar/test.jpg",
      "video": "test.mp4",
      "extra": "movies,awesome"
    })

    expect(result).toStrictEqual({
      "id": "61e81",
      "title": "Mi test movie",
      "description": "a test movie",
      "image": "http://foo.bar/test.jpg",
      "video": "test.mp4",
      "extra": "movies,awesome"
    })
  })

  it('should return false on error when creating movie', async () => {
    axios.post.mockRejectedValue('Some validation error')

    const result = await createMovie({})

    expect(axios.post).toHaveBeenCalledWith(API_URL + '/movies', {})
    expect(result).toBeFalsy()
    expect(console.error).toHaveBeenCalledWith('Some validation error')
  })

  it('should return true on successful movie update', async () => {
    const result = await updateMovie({
      id: 'abc123',
      description: 'A changed description'
    })

    expect(axios.put).toHaveBeenCalledWith(API_URL + '/movies/abc123', {
      id: 'abc123',
      description: 'A changed description'
    })

    expect(result).toBeTruthy()
  })

  it('should return false on error when updating movie', async () => {
    axios.put.mockRejectedValue('Movie not found')

    const result = await updateMovie({id: 'xyz789'})

    expect(axios.put).toHaveBeenCalledWith(API_URL + '/movies/xyz789', {
      id: 'xyz789'
    })

    expect(result).toBeFalsy()
    expect(console.error).toHaveBeenCalledWith('Movie not found')
  })

  it('should return true when successfully deleting movie', async () => {
    const result = await deleteMovie('abc123')

    expect(axios.delete).toHaveBeenCalledWith(API_URL + '/movies/abc123')
    expect(result).toBeTruthy()
  })

  it('should return false when error on deleting movie', async () => {
    axios.delete.mockRejectedValue('Error deleting movie')

    const result = await deleteMovie('xyz789')

    expect(axios.delete).toHaveBeenCalledWith(API_URL + '/movies/xyz789')
    expect(result).toBeFalsy()
    expect(console.error).toHaveBeenCalledWith('Error deleting movie')
  })
})