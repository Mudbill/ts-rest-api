# ts-rest-api

A boilerplate project with a simple setup for creating a RESTful API, complete with a database, JWT authorization and example routes.

While very basic, it might be useful as inspiration for others making APIs in Node.JS.

---

This is a pure TypeScript solution, utilizing [nedb-promises](https://github.com/bajankristof/nedb-promises) as the database, which is a JavaScript-only database based on MongoDB. Feel free to replace the database with anything else – I put it in as to not rely on external database software. That said, NeDB is quite nice for smaller projects.

### How to start

1. Run `npm install` or `yarn install`
2. Rename/copy `.env.example` to `.env` and change values to your liking
3. Run the `start` script, or `dev` if you want it to reload automatically

Some HTTP endpoints are already ready set up:

- POST /login
- POST /users
- GET /products
- POST /products

Have a look at the code, it should be quite straight forward and documented.
