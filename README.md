# INFO30005_Dream_Taste

## Group: Matrix

## Group Members: Zhu Yuan, Ju Shang, Mingyu Su, Hong Li

## Introduction:
A web application to present information related to drinks, and everyone can find the drink their dream tastes.

## Implemented Functions:
- Add product: the user can add product to our database.
- Search: the user can search product by product name.
- Log in: the user can log in to our website his/her username and password.
- Sign up: the user can sign up with an to our website.
- Browse product by category: the user can browse all the products by category.
- All products: the user can find out all the products within our database
- All categories: the user can find out all the availabe categories within our datbase.



## Routes:
- **Add product:** `/products/addProduct` A product with an image will be added to the database.

- **Search:** `/search` By typing the query into the search bar embedded in navigation bar, a user is able to find a product by its name, as long as the the product name contains the query input by user.

- **Log in:** `/login` Log in function can be tested using the follwoing test account:
```
username: test
password: 123456
```

- **Sign up:** `/register` A user can sign up to our website.

- **Browse by category:** `/products/:category` A user is able to view all the products within a category
```
Example: "https://dream-taste.herokuapp.com/products/soft%20drink"
```

- **All products:** `/products` All the products will be displayed with a small image and brief introduction to the drink.
```
Example: "https://dream-taste.herokuapp.com/products"
```

- **All categories:** `/categories` All the categories will be displayed.
