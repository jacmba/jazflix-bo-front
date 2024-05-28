import axios from "axios"
import { 
  createUser,
  retrieveUsers,
  retrieveUser,
  updateUser,
  deleteUser
} from "./users-service"
import { API_URL } from "../config"

jest.mock('axios')

describe('User service', () =>  {
  beforeEach(() => {
    axios.get.mockResolvedValue({
      data: [
        {
          "id": "c9534b1",
          "name": "john.doe@gmail.com",
          "enabled": true
        },
        {
          "id": "c9534b2",
          "name": "jane.doe@gmail.com",
          "enabled": null
        }
      ]
    })

    axios.post.mockImplementation(async (url, user) => (
      {data: {id: '123', ...user}}
    ))

    axios.put.mockImplementation(async (url, user) => {
      if (url.endsWith('/1')) {
        return {}
      } else {
        throw new Error('User not found')
      }
    })

    axios.delete.mockResolvedValue()

    jest.spyOn(console, 'error').mockImplementation(jest.fn())
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('retrieveUsers should return list of users', async () => {
    const users = await retrieveUsers()

    expect(axios.get).toHaveBeenCalled()
    expect(users.length).toBe(2)

    const [john, jane] = users

    expect(john.id).toBe('c9534b1')
    expect(john.name).toBe('john.doe@gmail.com')
    expect(john.enabled).toBeTruthy()

    expect(jane.id).toBe('c9534b2')
    expect(jane.name).toBe('jane.doe@gmail.com')
    expect(jane.enabled).toBe(null)
  })

  it('retrieveUser should return single user', async () => {
    axios.get.mockResolvedValue({ data: {
      id: '1',
      name: 'jdoe@foo.bar',
      enabled: true
    }})

    const user = await retrieveUser('1')

    expect(axios.get).toHaveBeenCalledWith(API_URL + '/user/1')
    expect(user.id).toBe('1')
    expect(user.name).toBe('jdoe@foo.bar')
    expect(user.enabled).toBeTruthy()
  })

  it('deleteUser should call delete method with given param', async() => {
    const deleted = await deleteUser('abc123')

    expect(axios.delete).toHaveBeenCalledWith(API_URL + '/user/abc123')
    expect(deleted).toBeTruthy()
  })

  it('createUser should return new user with id 123', async () => {
    const input = {
      name: 'test@lorem.ipsum',
      enabled: false
    }

    const user = await createUser(input)

    expect(axios.post).toHaveBeenCalledWith(API_URL + '/user', input)
    expect(user.id).toBe('123')
    expect(user.name).toBe('test@lorem.ipsum')
    expect(user.enabled).toBeFalsy()
  })

  it('updateUser with ID 1 should be executed successfully', async () => {
    const input = {
      id: 1,
      name: 'test@lorem.ipsum',
      enabled: true
    }

    const updated = await updateUser(input)

    expect(axios.put).toHaveBeenCalledWith(API_URL + '/user/1', input)
    expect(updated).toBeTruthy()
  })

  it('updateUser with ID other than 1 should fail', async () => {
    const input = {
      id: 2,
      name: 'fail@lorem.ipsum',
      enabled: true
    }

    const updated = await updateUser(input)

    expect(axios.put).toHaveBeenCalledWith(API_URL + '/user/2', input)
    expect(updated).toBeFalsy()
    expect(console.error).toHaveBeenCalledWith(new Error('User not found'))
  })

  it('deleteUser should return false on exception', async () => {
    axios.delete.mockRejectedValue('User does not exist')

    const deleted = await deleteUser('xyz456')

    expect(axios.delete).toHaveBeenCalledWith(API_URL + '/user/xyz456')
    expect(console.error).toHaveBeenCalledWith('User does not exist')
    expect(deleted).toBeFalsy()
  })
})