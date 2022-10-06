import { ProductStore } from '../src/models/product'

const store = new ProductStore();

const product = {
  "name": "product1",
  "price": 126.00
}

const editedProduct = {
  "name": "product1",
  "price": 125.00
}

const resProduct = {
  "name": "product1",
  "price": "126.00"
}


describe("Product Model", () => {
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

  it('expects create method to return the created product', async () => {
    const result = await store.create(product)
    expect(result).toEqual({
      id: jasmine.any(Number),
      ...resProduct
    })
  })

  it('expects index method to return list of products', async () => {
    const result = await store.index()
    expect(result).toEqual([{
      id: jasmine.any(Number),
      ...resProduct
    }])
  })

  it('expects show method to return the specific product', async () => {
    const result = await store.show(3)
    expect(result).toEqual({
      id: 3,
      ...resProduct
    })
  })

  it('expects edit method to return the edited Product', async () => {
    const result = await store.update(3, editedProduct)
    expect(result).toEqual(
      {
        id: 3,
        ...editedProduct, price: editedProduct.price.toFixed(2).toString()
      }
    )
  })

  it('expects delete method to return the deleted product', async () => {
    const result = await store.delete(3)
    expect(result).toEqual({
      id: 3,
      ...editedProduct, price: editedProduct.price.toFixed(2).toString()
    })
  })

})
