express: framework for nodeJS that makes setting up API servers very easy. Made up of a chain of middlewares that process requests.

-- require nextDB func that connects to mdb and logs it in term

-- routers import funcs from controller and passes requests to the correct function based on url passed.

CREATE CUSTOM ERROR MIDDLEWARE:

- accepts two args, custom error message and status code

MAIN FEATURES:

- dynamically routes requests using express Router
- logs req info using morgan module
- uses custom error handlers & custom Error class to define to provide custom message and status codes based on situation.
- uses asyncWrapper function that handles controller functions and limits excess async/await function declarations for slightly more readable code.
