# INFO30005 DreamTaste

## Team Profile

Team Name: Matrix

### Members

| Name |
| --------- |
| Zhu Yuan |
| Ju Shang |
| Mingyu Su |
| Hong Li |

## Introduction

A web application to present information related to drinks, and everyone can find the drink with their dream tastes.

### App Information

Link to app: <https://dream-taste.herokuapp.com/>

## Start Guide

- Clone this repository, and navigate to this repository folder in the CLI

- Before running the app, we need to install the node packages using the following command

  ```zsh
  npm install
  ```

- After the node packages being installed, run the following command to start the app

  ```zsh
  npm start
  ```

## Main Functions

- **Add product:** A product with an image will be added to the database.
- **Search:** By typing the query into the search bar embedded in navigation bar, a user is able to find a product by its name, as long as the the product name contains the query input by user.
- **Log in:** A user can log in to our website his/her username and password.
- **Sign up:** A user can sign up with an to our website.
- **Browse product by category:** A user can browse all the products by category.
- **Add to wishlist** A user can add products to their own wishlist
- **Rating** A user can rate product(1 star - 5 stars)
- **Edit User** A user can edit his own information and upload avatar
- **Trending** A user can see top 10 popular drinks

## Routes

- **Add product:** `/products/addProduct`

```txt
Example: https://dream-taste.herokuapp.com/addProduct
```

- **Search:** Doesn't have a GET URL. A page will only be displayed after a user input a search query in the search bar.

- **Log in:** `/login`

```txt
Example: https://dream-taste.herokuapp.com/login
```

Log in function can be tested using the following test account:

```txt
username: test
password: Test1234
```

- **Sign up:** `/register`

```txt
Example: https://dream-taste.herokuapp.com/register
```

- **Browse by category:** `/products/:category`

```txt
Example: https://dream-taste.herokuapp.com/products/soft%20drink
```

- **Add to wishlist:** `/addToWishlist/:id`

```txt
Example: https://dream-taste.herokuapp.com/products/5cd8f4bcfb120e00ccce1c76
```

- **Rating**`/addRating/:id`

```txt
Example: https://dream-taste.herokuapp.com/products/5cd8f4bcfb120e00ccce1c76
```

- **Edit User** `/profile`

```txt
Example: https://dream-taste.herokuapp.com/profile
```

- **Trending** `/trending`

```txt
Example: https://dream-taste.herokuapp.com/trending
```
