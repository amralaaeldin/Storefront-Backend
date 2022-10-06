import { OrderStore } from '../src/models/order'
import { ProductStore } from '../src/models/product'
import { UserStore } from '../src/models/user'
import Client from './../src/database';

const store = new OrderStore();
const productStore = new ProductStore();
const userStore = new UserStore();

const user = {
  fname: "sameh",
  lname: "hassan",
  email: "sameh.com",
  password: "sameh123"
}

const product1 = {
  "name": "product1",
  "price": 126.00
}
const product2 = {
  "name": "product2",
  "price": 20.00
}

const order = {
  "userId": 1,
  "status": false
}

const resOrder = {
  "user_id": '1',
  "status": false
}

const editedOrder = {
  "userId": 1,
  "status": true
}

const OrderProduct = {
  "id": 1,
  "order_id": "1",
  "product_id": "1",
  "quantity": 5,
}

const productInOrderOfUser = {
  "order_id": 1,
  "name": "product1",
  "price": '126.00',
  "quantity": 5,
  "status": false,
  fname: "sameh",
  lname: "hassan",
  email: "sameh.com",
  "user_id": 1,
}

const productInOrder = {
  "order_id": 1,
  "name": "product1",
  "price": '126.00',
  "quantity": 5,
  "status": false,
}


describe("Order Model", () => {
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
  it('should have getProductsInOrdersOfUser method', () => {
    expect(store.getProductsInOrdersOfUser).toBeDefined()
  })
  it('should have getProductsInOrder method', () => {
    expect(store.getProductsInOrder).toBeDefined()
  })
  it('should have getProductsInOrderOfUser method', () => {
    expect(store.getProductsInAnOrderOfUser).toBeDefined()
  })
  it('should have assignProductToOrder method', () => {
    expect(store.assignProductToOrder).toBeDefined()
  })

  it('expects create method to return the created order', async () => {
    // create user & products
    await userStore.create(user)
    await productStore.create(product1)
    await productStore.create(product2)

    const result = await store.create(order)
    expect(result).toEqual({
      id: jasmine.any(Number),
      ...resOrder
    })
  })

  it('expects index method to return list of orders', async () => {
    const result = await store.index()
    expect(result).toEqual([{
      id: jasmine.any(Number),
      ...resOrder
    }])
  })

  it('expects to add a product to an order and return the order_product', async () => {
    const result = await store.assignProductToOrder(1, {
      product_id: 1,
      quantity: 5
    })
    expect(result).toEqual(OrderProduct)
  })

  it('expects to get list of products that in orders of a user', async () => {
    const result = await store.getProductsInOrdersOfUser(1)
    expect(result).toEqual([productInOrderOfUser])
  })

  it('expects to get list of products that in an order', async () => {
    const result = await store.getProductsInOrder(1)
    expect(result).toEqual([productInOrder])
  })

  it('expects index method to return list of orders', async () => {
    const result = await store.getProductsInAnOrderOfUser(1, 1)
    expect(result).toEqual([productInOrderOfUser])
  })

  it('expects show method to return the specific order', async () => {
    const result = await store.show(1)
    expect(result).toEqual({
      id: 1,
      ...resOrder
    })
  })

  it('expects edit method to return the edited order', async () => {
    const result = await store.update(1, editedOrder)
    expect(result).toEqual(
      {
        id: 1,
        status: true,
        user_id: editedOrder.userId.toString()
      }
    )
  })

  it('expects delete method to return the deleted order', async () => {
    // delete order_product, user, products & order
    const conn = await Client.connect();
    await conn.query('DELETE FROM orders_products WHERE id=1');
    conn.release();
    const result = await store.delete(1)
    await userStore.delete(1)
    await productStore.delete(1)
    await productStore.delete(2)
    
    expect(result).toEqual({
      id: 1,
      status: true,
      user_id: editedOrder.userId.toString()
    })
  })

})

