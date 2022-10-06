import { UserStore } from '../src/models/user'

const store = new UserStore();

const user = {
  fname: "sameh",
  lname: "hassan",
  email: "sameh.com",
  password: "sameh123"
}

const realUser = {
  email: "sameh.com",
  password: "sameh123"
}

const fakeUser = {
  email: "fake.com",
  password: "fake123"
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
    const result = await store.show(2)
    expect(result).toEqual({
      id: 2,
      ...user, password: jasmine.any(String)
    })
  })

  it('expects to get to return the user with email', async () => {
    const result = await store.check(realUser.email)
    expect(result).toEqual({
      id: jasmine.any(Number),
      ...user,
      password: jasmine.any(String)
    })
  })

  it('expects to get to return null with email of user that is not exist', async () => {
    const result = await store.check(fakeUser.email)
    expect(result).toBe(null)
  })

  it('expects to get to return the user', async () => {
    const result = await store.authenticate(realUser)
    expect(result).toEqual({
      id: jasmine.any(Number),
      ...user,
      password: jasmine.any(String)
    })
  })

  it('expects to get null for user that is not exist', async () => {
    const result = await store.authenticate(fakeUser)
    expect(result).toBe(null)
  })

  it('expects edit method to return the edited user', async () => {
    const result = await store.update(2, editedUser)
    expect(result).toEqual(
      {
        id: 2,
        ...editedUser,
        password: jasmine.any(String)
      }
    )
  })

  it('expects delete method to return the deleted user', async () => {
    const result = await store.delete(2)
    expect(result).toEqual({
      id: 2,
      ...editedUser,
      password: jasmine.any(String)
    })
  })


})
