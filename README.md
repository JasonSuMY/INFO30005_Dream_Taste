# INFO30005_Dream_Taste

## Group: Matrix

## Group Members: Zhu Yuan, Ju Shang, Mingyu Su, Hong Li

## Introduction:
A web application to present information related to drinks, and everyone can find the drink their dream tastes.

## Main Functions:
- **Add product:** A product with an image will be added to the database.
- **Search:** By typing the query into the search bar embedded in navigation bar, a user is able to find a product by its name, as long as the the product name contains the query input by user.
- **Log in:** A user can log in to our website his/her username and password.
- **Sign up:** A user can sign up with an to our website.
- **Browse product by category:** A user can browse all the products by category.

## Routes:
- **Add product:** `/products/addProduct` 
```
Example: https://dream-taste.herokuapp.com/addProduct
```

- **Search:** Doesn't have a GET URL. A page will only be displayed after a user input a search query in the search bar.

- **Log in:** `/login` 
```
Example: https://dream-taste.herokuapp.com/login
```
Log in function can be tested using the follwoing test account:
```
username: test
password: Test1234
```

- **Sign up:** `/register`
```
Example: https://dream-taste.herokuapp.com/register
```

- **Browse by category:** `/products/:category`
```
Example: https://dream-taste.herokuapp.com/products/soft%20drink
```

## Reference to source coce:
All routes related code are written within `route.js`
- **Add product:**
  - Views:
    - default.pug
    - addProduct.pug
  - Controllers:
    - /controllers/products.js
  - Models:
    - /models/products.js
    - /models/categories.js
- **Search:**
  - Views:
    - default.pug
    - searchResults.pug
  - Controllers:
    - /controllers/products.js
  - Models:
    - /models/products.js
- **Log in:**
  - Views:
    - default.pug
    - login.pug
  - Controllers:
    - /controllers/users.js
  - Models:
    - /models/users.js
- **Sign up:**
  - Views:
    - default.pug
    - register.pug
  - Controllers:
    - /controllers/users.js
  - Models:
    - /models/users.js
- **Browse by category:**
  - Views: 
    - categories.pug
    - products.pug
  - Controllers:
    - /controllers/categories.js
    - /controllers/products.js
  - Models:
    - /models/categories.js
    - /models/producsts.js
