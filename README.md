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
        log in function can be tested using a sample account:
        username: mingyu
        password: 12345678
-Add product: POST-"/products/addProduct"
        to add a product, a certain format should be followed:
            name: String,
            picture: {data: Buffer, contentType: String},
            price: String,
            description: String,
            category: String,
            rating: {type: Number, min: 0, max: 10},
-Browse by category: GET-"/products/:category"
-All products: GET-"/products"
-All categories: GET-"/categories"