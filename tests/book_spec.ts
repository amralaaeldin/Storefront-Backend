import { Book, BookStore } from '../src/models/book'


const store = new BookStore();

const book = {
  title: 'Bridge to Terabithia',
  total_pages: 250,
  author: 'Katherine Paterson',
  type: 'Childrens',
  summary: 'This is good book'
}
const editedBook = {
  title: 'Edited Bridge to Terabithia',
  total_pages: 270,
  author: 'Edited Katherine Paterson',
  type: 'Childrens',
  summary: 'This is good edited book'
}

describe("Book Model", () => {
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
    expect(store.edit).toBeDefined()
  })
  it('should have delete method', () => {
    expect(store.delete).toBeDefined()
  })


  it('expects create method to return the created book', async () => {
    const result = await store.create({
      ...book
    })
    expect(result).toEqual({
      id: jasmine.any(Number),
      ...book
    })
  })

  it('expects index method to return list of books', async () => {
    const result = await store.index()
    expect(result).toEqual([{
      id: jasmine.any(Number),
      ...book
    }])
  })

  it('expects show method to return the specific book', async () => {
    const result = await store.show(1)
    expect(result).toEqual({
      id: 1,
      ...book
    })
  })

  it('expects edit method to return the edited book', async () => {
    const result = await store.edit(1, {
      ...editedBook
    })
    expect(result).toEqual(
      {
        id: 1,
        ...editedBook
      }
    )
  })


  it('expects delete method to return the deleted book', async () => {
    const result = await store.delete(1)
    expect(result).toEqual({
      id: 1,
      ...editedBook
    })
  })


})
