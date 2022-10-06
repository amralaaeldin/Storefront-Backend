import { UserStore } from '../src/models/user'

const store = new UserStore();

const user = {
  fname: "sameh",
  lname: "hassan",
  email: "sameh.com",
  password: "sameh123"
}

const editedUser = {
  fname: "sameh",
  lname: "hussain",
  email: "sameh.com",
  password: "sameh123"
}


describe("User Model", () => {
  it('should have index method', () => {
    expect(store.index).toBeDefined()
  })
  it('should have show method', () => {
    expect(store.show).toBeDefined()
  })
  it('should have create method', () => {
    expect(store.create).toBeDefined()
  })
  it('should have edit method', () => {
    expect(store.update).toBeDefined()
  })
  it('should have delete method', () => {
    expect(store.delete).toBeDefined()
  })
  it('should have check method', () => {
    expect(store.check).toBeDefined()
  })
  it('should have authenticate method', () => {
    expect(store.authenticate).toBeDefined()
  })

  it('expects create method to return the created user', async () => {
    const result = await store.create(user)
    expect(result).toEqual({
      id: jasmine.any(Number),
      ...user, password: jasmine.any(String)
    })
  })

  it('expects index method to return list of users', async () => {
    const result = await store.index()
    expect(result).toEqual([{
      id: jasmine.any(Number),
      ...user, password: jasmine.any(String)
    }])
  })

  it('expects show method to return the specific user', async () => {
    const result = await store.show(1)
    expect(result).toEqual({
      id: 1,
      ...user, password: jasmine.any(String)
    })
  })

  it('expects edit method to return the edited user', async () => {
    const result = await store.update(1, editedUser)
    expect(result).toEqual(
      {
        id: 1,
        ...editedUser,
        password: jasmine.any(String)
      }
    )
  })

  it('expects delete method to return the deleted book', async () => {
    const result = await store.delete(1)
    expect(result).toEqual({
      id: 1,
      ...editedUser,
      password: jasmine.any(String)
    })
  })


})
