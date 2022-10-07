## API Endpoints
#### Products
- Index : get `/products` 
- Show  : get `/products/{id}`                                                  (args: product id)
- Create: post `/products`                                  [token required]

#### Users
- Index : get `/users`                                      [token required]
- Show  : get `/users/{id}`                                 [token required]    (args: user id)
- Create: post `/users`

#### Orders
- Current Order by user: get `/users/{id}/orders`           [token required]    (args: user id)

## Data Shapes
#### Product
`products table`
- id                SERIAL PRIMARY KEY
- name              VARCHAR(50)
- price             DECIMAL(10,2) 

#### User
`users table`
- id                SERIAL PRIMARY KEY
- fname             VARCHAR(50)
- lname             VARCHAR(50)
- email             VARCHAR(100)
- password          VARCHAR(100)

#### Orders
`orders table`
- id                SERIAL PRIMARY KEY
- user_id           BIGINT REFERENCES users(id)
- status            BOOLEAN    (false => active, true => complete)
#### Orders-Products
`orders_products table`
- id                SERIAL PRIMARY KEY
order_id            BIGINT REFERENCES orders(id)
product_id          BIGINT REFERENCES products(id)
quantity            INT
