import { ProductStore } from '../src/models/product'

const store = new ProductStore();

const Product = {
  "name": "product1",
  "price": "126.00"
}

const editedProduct = {
  "name": "product1",
  "price": "125.00"
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

})
