import supertest from 'supertest';
import app from './../src/index';

const request = supertest(app);

it('gets the root endpoint', (done) => {
  (async function () {
    try {
      const response = await request.get('/');
      expect(response.status).toBe(200);
      done();
    } catch (e) {
      done.fail(e as Error);
    }
  })();
});

describe('Testing user endpoints responses', () => {

  it('gets users endpoint', (done) => {
    (async function () {
      try {
        const response = await request.get('/users');
        expect(response.status).toBe(503);
        done();
      } catch (e) {
        done.fail(e as Error);
      }
    })();
  });

  it('gets users/:id endpoint', (done) => {
    (async function () {
      try {
        const response = await request.get('/users/5');
        expect(response.status).toBe(503);
        done();
      } catch (e) {
        done.fail(e as Error);
      }
    })();
  });

  it('tries to add a user endpoint', (done) => {
    (async function () {
      try {
        const response = await request.post('/users/');
        expect(response.status).toBe(400);
        done();
      } catch (e) {
        done.fail(e as Error);
      }
    })();
    
  });

});

describe('Testing product endpoints responses', () => {

  it('gets products endpoint', (done) => {
    (async function () {
      try {
        const response = await request.get('/products');
        expect(response.status).toBe(200);
        done();
      } catch (e) {
        done.fail(e as Error);
      }
    })();
  });

  it('gets products/:id endpoint', (done) => {
    (async function () {
      try {
        const response = await request.get('/products/5');
        expect(response.status).toBe(200);
        done();
      } catch (e) {
        done.fail(e as Error);
      }
    })();
  });

  it('tries to add a product endpoint', (done) => {
    (async function () {
      try {
        const response = await request.post('/products/');
        expect(response.status).toBe(503);
        done();
      } catch (e) {
        done.fail(e as Error);
      }
    })();
    
  });

});

describe('Testing order endpoints responses', () => {

  it('gets orders endpoint', (done) => {
    (async function () {
      try {
        const response = await request.get('/orders');
        expect(response.status).toBe(503);
        done();
      } catch (e) {
        done.fail(e as Error);
      }
    })();
  });

  it('gets orders/:id endpoint', (done) => {
    (async function () {
      try {
        const response = await request.get('/orders/5');
        expect(response.status).toBe(503);
        done();
      } catch (e) {
        done.fail(e as Error);
      }
    })();
  });

  it('tries to add an order endpoint', (done) => {
    (async function () {
      try {
        const response = await request.post('/orders/');
        expect(response.status).toBe(503);
        done();
      } catch (e) {
        done.fail(e as Error);
      }
    })();
  });

  it('tries to get orders of a user endpoint', (done) => {
    (async function () {
      try {
        const response = await request.get('/users/1/orders');
        expect(response.status).toBe(503);
        done();
      } catch (e) {
        done.fail(e as Error);
      }
    })();
  });

});

