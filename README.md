# INFO30005_Dream_Taste
Group: Matrix

Group Members: Zhu Yuan, Ju Shang, Mingyu Su, Hong Li

A web application to present information related to drinks

Implemented Functions:
-Log in: the user can log in to our website his/her username and password.
-Add product: the user can add product to our database.
-Browse product by category: the user can browse all the products by category.
-All products: the user can find out all the products within our database
-All categories: the user can find out all the availabe categories within our
                 datbase.

Routes (Method-"URL"):
-Log in: POST-"/logIn"
        log in function can be tested using a sample account in the format of 
        JSON:
        {
            "username": "mingyu",
            "password": "12345678"
        }
-Add product: POST-"/products/addProduct"
        to add a product, a certain format should be followed, and it needs to
        be a JSON file:
            {
                "name": "drink name",
                "price": "drink price",
                "description": "A short description of the drink.",
                "category": "The category of the dinrk.",
            }
        the category needs to be existed in our database in order to add tihs
        product.
-Browse by category: GET-"/products/:category"
        Example: "https://dream-taste.herokuapp.com/products/soft%20drink"
-All products: GET-"/products"
        Example: "https://dream-taste.herokuapp.com/products"
-All categories: GET-"/categories"
        Example: "https://dream-taste.herokuapp.com/categories"