# Local Marketplace & Delivery Platform --- Project Roadmap

## 0. Project Goal

Build a full-stack web application for local shops, customers, delivery
workers, and administrators.

The platform allows:

-   Customers to discover local shops and products.
-   Customers to add products to a cart and place orders.
-   Shop owners to manage their shops, products, stock, and orders.
-   Delivery workers to accept and deliver orders.
-   Administrators to manage the platform.
-   Users to receive order-status updates.
-   The application to be deployed and usable online.

### Main goal

This is not just a CRUD project.

The project should demonstrate that I can design, build, connect,
secure, test, and deploy a complete web application.

------------------------------------------------------------------------

# 1. Target Technology Stack

## Frontend

-   React
-   TypeScript
-   React Router
-   Axios
-   Context API
-   CSS / Tailwind CSS
-   Form validation

## Backend

-   Node.js
-   Express
-   TypeScript
-   REST API
-   JWT authentication
-   HTTP-only cookies where appropriate
-   bcrypt
-   Mongoose

## Database

-   MongoDB
-   MongoDB Atlas for production

## Later / Advanced

-   Socket.IO for real-time updates
-   Cloudinary or another image-storage service
-   Testing framework
-   GitHub Actions / CI
-   Deployment platform

------------------------------------------------------------------------

# 2. User Roles

The application has four main roles.

## Customer

Can:

-   Register and log in.
-   Browse shops.
-   Search for products.
-   Filter products.
-   View shop pages.
-   Add products to cart.
-   Change cart quantities.
-   Checkout.
-   View previous orders.
-   Track current orders.
-   Review products or shops if implemented.

## Shop Owner

Can:

-   Create a shop.
-   Edit shop information.
-   Add products.
-   Edit products.
-   Delete products.
-   Manage stock.
-   View incoming orders.
-   Accept or reject orders.
-   Update preparation status.
-   View shop statistics.

## Delivery Worker

Can:

-   View available delivery jobs.
-   Accept a delivery.
-   View assigned deliveries.
-   Update delivery status.
-   View completed deliveries.
-   View delivery history.

## Admin

Can:

-   View users.
-   Manage users.
-   Manage shops.
-   Manage products.
-   Monitor orders.
-   Handle reports.
-   Suspend users/shops if needed.
-   View platform statistics.

------------------------------------------------------------------------

# 3. High-Level Architecture

``` text
                    React + TypeScript
                           |
                           | Axios / HTTP
                           v
                 Express + TypeScript
                           |
              +------------+------------+
              |                         |
              v                         v
        Authentication              Business Logic
              |                         |
              +------------+------------+
                           |
                           v
                     Mongoose
                           |
                           v
                       MongoDB
```

Later:

``` text
React
  |
  +---- REST API ----> Express ----> MongoDB
  |
  +---- WebSocket ---> Socket.IO ---> Express
```

------------------------------------------------------------------------

# PHASE 1 --- Project Setup

## Goal

Create the frontend and backend projects and make sure they can
communicate.

## Tasks

### Repository

-   Create GitHub repository.
-   Add `.gitignore`.
-   Create `README.md`.
-   Create a useful folder structure.
-   Make the first commit.

Suggested structure:

``` text
marketplace/
│
├── Client/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── Server/
│   ├── src/
│   ├── package.json
│   └── ...
│
├── .gitignore
└── README.md
```

## Backend

Set up:

-   Node.js
-   Express
-   TypeScript
-   dotenv
-   CORS
-   basic error handling

Create:

``` text
Server/src/
├── server.ts
├── app.ts
├── routes/
├── controllers/
├── models/
├── middleware/
├── services/
└── utils/
```

## Frontend

Set up:

-   React
-   TypeScript
-   React Router
-   Axios

## Checkpoint

The frontend can make a request to:

``` text
GET /api/health
```

and receive:

``` json
{
  "message": "Server is running"
}
```

------------------------------------------------------------------------

# PHASE 2 --- Learn TypeScript Through the Project

## Goal

Become comfortable enough with TypeScript to use it throughout the
project.

Do not try to learn every TypeScript feature.

Focus on:

-   Primitive types
-   Arrays
-   Objects
-   Interfaces
-   Type aliases
-   Optional properties
-   Union types
-   Function types
-   Generics
-   Type narrowing
-   Async function types
-   React props
-   React state types
-   API response types
-   Express request/response types

## Important examples

``` ts
type Role = "customer" | "shop" | "delivery" | "admin";
```

``` ts
interface Product {
    name: string;
    price: number;
    stock: number;
}
```

``` ts
const products: Product[] = [];
```

``` ts
interface ProductCardProps {
    product: Product;
}
```

## Checkpoint

Frontend and backend are both using TypeScript successfully.

------------------------------------------------------------------------

# PHASE 3 --- Database Design

## Goal

Design the database before creating complicated application logic.

Initial models:

``` text
User
Shop
Product
Cart
Order
OrderItem
Delivery
Review
```

Possible relationships:

``` text
User
 ├── owns ───────> Shop
 ├── creates ────> Order
 ├── has ────────> Cart
 ├── receives ───> Delivery
 └── writes ──────> Review

Shop
 └── contains ───> Product

Order
 ├── contains ───> OrderItem
 └── may have ───> Delivery
```

## User

Possible fields:

``` text
_id
name
email
password
role
phone
createdAt
updatedAt
```

## Shop

Possible fields:

``` text
_id
owner
name
description
address
phone
image
isOpen
createdAt
updatedAt
```

## Product

Possible fields:

``` text
_id
shop
name
description
price
stock
category
image
isAvailable
createdAt
updatedAt
```

## Cart

Possible fields:

``` text
_id
user
items
updatedAt
```

## Order

Possible fields:

``` text
_id
customer
shop
items
totalPrice
deliveryAddress
status
paymentMethod
createdAt
updatedAt
```

## Delivery

Possible fields:

``` text
_id
order
deliveryWorker
status
acceptedAt
deliveredAt
```

## Checkpoint

MongoDB connection works and the basic Mongoose models can be created
and queried.

------------------------------------------------------------------------

# PHASE 4 --- Authentication

## Goal

Build secure registration and login.

## Backend

Implement:

``` text
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
POST /api/auth/refresh
GET  /api/auth/me
```

Use:

-   bcrypt for passwords.
-   JWT for authentication.
-   HTTP-only cookies where appropriate.
-   Environment variables for secrets.

## Frontend

Create:

``` text
/login
/register
```

Create an authentication context.

Example concept:

``` text
AuthContext
    |
    +-- user
    +-- loading
    +-- login()
    +-- logout()
    +-- refreshUser()
```

## Protected Routes

Examples:

``` text
/customer/*
/shop/*
/delivery/*
/admin/*
```

## Checkpoint

A user can:

``` text
Register
   ↓
Login
   ↓
Stay authenticated
   ↓
Access protected page
   ↓
Logout
```

------------------------------------------------------------------------

# PHASE 5 --- Authorization

## Goal

Authentication answers:

> Who are you?

Authorization answers:

> What are you allowed to do?

Create role-based middleware.

Example:

``` text
requireAuth
requireRole("shop")
requireRole("admin")
```

Rules:

### Customer

Can create their own orders.

### Shop owner

Can modify only their own shop and products.

### Delivery worker

Can modify only deliveries assigned to them.

### Admin

Can access administration endpoints.

## Important security rule

Never trust the frontend for authorization.

Bad:

``` text
Frontend says:
"I am an admin."
```

Good:

``` text
Request
   ↓
JWT
   ↓
Server identifies user
   ↓
Server checks role
   ↓
Server allows/denies action
```

## Checkpoint

A customer cannot access shop-owner or admin operations simply by
manually changing the URL or request.

------------------------------------------------------------------------

# PHASE 6 --- Shop Management

## Goal

Allow shop owners to manage their shops.

Features:

-   Create shop.
-   Edit shop.
-   View shop.
-   Open/close shop.
-   Update shop information.

Routes could include:

``` text
POST   /api/shops
GET    /api/shops
GET    /api/shops/:id
PATCH  /api/shops/:id
DELETE /api/shops/:id
```

Frontend pages:

``` text
/shops
/shops/:id
/shop/dashboard
/shop/settings
```

## Checkpoint

A shop owner can create and manage their own shop.

------------------------------------------------------------------------

# PHASE 7 --- Product Management

## Goal

Allow shop owners to manage products.

Features:

-   Add product.
-   Edit product.
-   Delete product.
-   Change price.
-   Change stock.
-   Mark unavailable.
-   Upload image.
-   Categorize products.

Routes:

``` text
POST   /api/products
GET    /api/products
GET    /api/products/:id
PATCH  /api/products/:id
DELETE /api/products/:id
```

Add:

-   Search.
-   Category filtering.
-   Price filtering.
-   Sorting.

## Checkpoint

Customers can browse products while shop owners can manage their own
products.

------------------------------------------------------------------------

# PHASE 8 --- Customer Shopping Experience

## Goal

Build the complete shopping flow.

Frontend:

``` text
Home
  ↓
Shops
  ↓
Shop Page
  ↓
Product
  ↓
Cart
  ↓
Checkout
```

Features:

-   Browse shops.
-   Search products.
-   Filter products.
-   Add to cart.
-   Remove from cart.
-   Change quantity.
-   Show subtotal.
-   Show delivery fee if applicable.
-   Show total.

## Checkpoint

A customer can build a cart and reach checkout.

------------------------------------------------------------------------

# PHASE 9 --- Orders

## Goal

Turn a cart into a real order.

Order creation flow:

``` text
Customer
   ↓
Cart
   ↓
Checkout
   ↓
Validate stock
   ↓
Create Order
   ↓
Reduce/hold stock
   ↓
Clear Cart
```

Important:

The server must calculate the final price.

Do not trust:

``` text
price
total
discount
```

sent by the frontend.

The backend should retrieve the actual product information and calculate
the total itself.

## Order status

Start with:

``` text
Pending
   ↓
Accepted
   ↓
Preparing
   ↓
Ready
   ↓
OutForDelivery
   ↓
Delivered
```

Also support:

``` text
Rejected
Cancelled
```

if appropriate.

## Checkpoint

A customer can place an order and the shop can see it.

------------------------------------------------------------------------

# PHASE 10 --- Shop Order Management

## Goal

Give shop owners a useful dashboard.

Dashboard features:

-   New orders.
-   Pending orders.
-   Current orders.
-   Completed orders.
-   Order details.
-   Accept order.
-   Reject order.
-   Change preparation status.

Example:

``` text
Pending
   ↓
Accepted
   ↓
Preparing
   ↓
Ready
```

The backend should verify that the shop actually owns the order before
allowing the action.

------------------------------------------------------------------------

# PHASE 11 --- Delivery System

## Goal

Connect ready orders with delivery workers.

Flow:

``` text
Shop
  ↓
Order is Ready
  ↓
Delivery request
  ↓
Delivery worker sees request
  ↓
Worker accepts
  ↓
Out for Delivery
  ↓
Delivered
```

Delivery worker pages:

``` text
/delivery/dashboard
/delivery/available
/delivery/active
/delivery/history
```

## Checkpoint

A delivery worker can accept a delivery and complete it.

------------------------------------------------------------------------

# PHASE 12 --- Admin Dashboard

## Goal

Create a central management system.

Admin pages:

``` text
/admin
/admin/users
/admin/shops
/admin/products
/admin/orders
/admin/reports
```

Possible statistics:

``` text
Total users
Total shops
Total products
Total orders
Completed orders
Cancelled orders
Revenue
```

Admin capabilities:

-   View users.
-   View shops.
-   View orders.
-   Suspend users.
-   Suspend shops.
-   Remove inappropriate products.
-   Review reports.

------------------------------------------------------------------------

# PHASE 13 --- Reviews and Ratings

## Goal

Add community feedback.

Customers can review completed orders/products/shops.

Possible fields:

``` text
user
product
shop
order
rating
comment
createdAt
```

Rules:

-   A user should only review something they actually purchased.
-   A user should not be able to create unlimited duplicate reviews.
-   Validate rating range on the server.

Example:

``` text
★★★★★
4.7 / 5
```

------------------------------------------------------------------------

# PHASE 14 --- Images and File Uploads

## Goal

Allow users to upload:

-   Profile images.
-   Shop images.
-   Product images.

Do not store large image files directly inside MongoDB unless there is a
specific reason to do so.

Use a dedicated image-storage service.

Possible solution:

``` text
React
   ↓
Backend
   ↓
Image storage service
   ↓
Image URL
   ↓
MongoDB
```

Store the URL/reference in MongoDB.

------------------------------------------------------------------------

# PHASE 15 --- Real-Time Updates

## Goal

Make order tracking feel like a real application.

Learn:

-   WebSockets.
-   Socket.IO.
-   Events.
-   Rooms.

Example:

``` text
Shop changes order:

Preparing → Ready

        ↓
      Server

        ↓ Socket.IO

     Customer
```

The customer can see:

``` text
Your order is ready!
```

without refreshing the page.

Potential events:

``` text
order:created
order:accepted
order:preparing
order:ready
delivery:accepted
order:out-for-delivery
order:delivered
```

------------------------------------------------------------------------

# PHASE 16 --- Notifications

## Goal

Notify users about important events.

Start with in-app notifications.

Examples:

``` text
Your order was accepted.
Your order is being prepared.
Your order is ready.
Your order is out for delivery.
Your order has been delivered.
```

Possible future extension:

-   Email notifications.
-   Push notifications.

------------------------------------------------------------------------

# PHASE 17 --- Search and Better Data Handling

## Goal

Make the application practical with larger amounts of data.

Implement:

-   Pagination.
-   Search.
-   Filtering.
-   Sorting.
-   Debounced search.
-   Server-side queries.

Example:

``` text
GET /api/products?
    search=milk
    &category=drinks
    &minPrice=10
    &maxPrice=100
    &page=2
```

Learn why pagination should eventually happen on the server instead of
downloading thousands of records to the browser.

------------------------------------------------------------------------

# PHASE 18 --- Validation and Error Handling

## Goal

Make the application robust.

Validate:

-   Registration.
-   Login.
-   Product creation.
-   Shop creation.
-   Order creation.
-   Review creation.

Handle:

``` text
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
409 Conflict
500 Internal Server Error
```

Create consistent API errors.

Example:

``` json
{
  "success": false,
  "message": "Product not found"
}
```

Frontend should display useful errors instead of silently failing.

------------------------------------------------------------------------

# PHASE 19 --- Loading and UX States

## Goal

Make the frontend feel like a real application.

Every important request should consider:

``` text
Loading
Success
Empty
Error
```

Example:

``` text
Loading products...

No products found.

Failed to load products.

Products:
...
```

Add:

-   Loading indicators.
-   Disabled buttons during requests.
-   Confirmation dialogs.
-   Empty states.
-   Error messages.
-   Responsive layout.

------------------------------------------------------------------------

# PHASE 20 --- Testing

## Goal

Learn how to verify that the application actually works.

Start with backend/API tests.

Test:

-   Registration.
-   Login.
-   Authentication.
-   Authorization.
-   Product creation.
-   Order creation.
-   Invalid requests.

Then add frontend tests where useful.

Also manually test important user journeys.

### Critical journey

``` text
Customer registers
       ↓
Logs in
       ↓
Finds shop
       ↓
Adds product
       ↓
Checks out
       ↓
Shop accepts order
       ↓
Shop prepares order
       ↓
Delivery worker accepts
       ↓
Delivery completed
       ↓
Customer sees Delivered
```

This entire flow should work before calling the project complete.

------------------------------------------------------------------------

# PHASE 21 --- Security Review

Before deployment, review:

-   Password hashing.
-   JWT handling.
-   HTTP-only cookies where appropriate.
-   CORS.
-   Environment variables.
-   Input validation.
-   Authorization.
-   Rate limiting.
-   MongoDB injection protection.
-   File upload restrictions.
-   Error-message leakage.
-   Sensitive information in responses.

Never commit:

``` text
.env
JWT_SECRET
database passwords
API keys
private credentials
```

------------------------------------------------------------------------

# PHASE 22 --- Performance

Do not optimize everything prematurely.

First make it correct.

Then investigate:

-   Database indexes.
-   Pagination.
-   Image optimization.
-   API response size.
-   Unnecessary React renders.
-   Caching where appropriate.
-   Slow database queries.

Use actual measurements rather than guessing.

------------------------------------------------------------------------

# PHASE 23 --- Deployment

## Frontend

Deploy the React application.

## Backend

Deploy the Node/Express API.

## Database

Use MongoDB Atlas or another hosted MongoDB solution.

## Production configuration

Set:

``` text
Production environment variables
Production database
Production API URL
CORS configuration
Cookie configuration
Image storage
```

## Checkpoint

The application is accessible from a public URL and works outside the
development machine.

------------------------------------------------------------------------

# PHASE 24 --- CI/CD

Once deployment works manually, automate it.

Possible pipeline:

``` text
git push
   ↓
GitHub
   ↓
CI
   ├── Install dependencies
   ├── TypeScript check
   ├── Tests
   └── Build
        ↓
     Deployment
```

Learn:

-   GitHub Actions.
-   Environment variables.
-   Build steps.
-   Deployment triggers.

------------------------------------------------------------------------

# PHASE 25 --- Documentation

Create a professional README.

Include:

## Project description

What problem does the application solve?

## Features

List major features.

## Technologies

``` text
React
TypeScript
Node.js
Express
MongoDB
Mongoose
JWT
Socket.IO
...
```

## Architecture

Add a simple architecture diagram.

## Database design

Explain the main models.

## API

Document important endpoints.

Example:

``` text
POST /api/auth/login
GET /api/products
POST /api/orders
PATCH /api/orders/:id/status
```

## Installation

Explain how another developer can run the project.

## Environment variables

Explain which variables are required without exposing their values.

## Screenshots

Show the finished application.

## Demo

Include the deployed URL.

------------------------------------------------------------------------

# PHASE 26 --- Final Polish

Before considering the project finished:

-   Remove debugging logs.
-   Remove dead code.
-   Fix TypeScript errors.
-   Fix ESLint errors.
-   Test all important flows.
-   Test mobile layout.
-   Check authentication expiration.
-   Check unauthorized access.
-   Check invalid input.
-   Check empty states.
-   Check slow network situations.
-   Check broken images.
-   Check database errors.
-   Improve UI consistency.
-   Improve README.

------------------------------------------------------------------------

# Recommended Git Workflow

Use meaningful commits.

Examples:

``` text
feat: add user registration
feat: add login authentication
feat: add shop model
feat: add product management
feat: add shopping cart
feat: add order creation
feat: add delivery workflow
feat: add admin dashboard
fix: prevent users from editing other shops
fix: validate product stock before checkout
refactor: separate order service
```

Avoid commits such as:

``` text
stuff
changes
final
final2
working
asdf
```

Create branches for larger features:

``` text
main
│
├── feature/auth
├── feature/products
├── feature/orders
├── feature/delivery
└── feature/admin
```

Merge completed features into `main` after testing.

------------------------------------------------------------------------

# Suggested Development Order

Do not build features randomly.

Follow this dependency order:

``` text
1. Project setup
       ↓
2. TypeScript basics
       ↓
3. Database
       ↓
4. Authentication
       ↓
5. Authorization
       ↓
6. Shops
       ↓
7. Products
       ↓
8. Customer browsing
       ↓
9. Cart
       ↓
10. Orders
       ↓
11. Shop order management
       ↓
12. Delivery
       ↓
13. Admin
       ↓
14. Reviews
       ↓
15. Images
       ↓
16. Real-time updates
       ↓
17. Notifications
       ↓
18. Validation/error handling
       ↓
19. Testing
       ↓
20. Security review
       ↓
21. Deployment
       ↓
22. CI/CD
       ↓
23. Documentation
       ↓
24. Final polish
```

------------------------------------------------------------------------

# MVP Definition

Do NOT wait until every phase is complete before having a usable
application.

Your first MVP should be:

``` text
Customer
   ↓
Register/Login
   ↓
Browse shops
   ↓
Browse products
   ↓
Cart
   ↓
Checkout
   ↓
Order

Shop Owner
   ↓
Login
   ↓
Manage shop
   ↓
Manage products
   ↓
Accept order
   ↓
Update order status
```

Once this works, you already have a real application.

Then add:

``` text
Delivery
   ↓
Admin
   ↓
Reviews
   ↓
Images
   ↓
Real-time updates
   ↓
Notifications
   ↓
Testing
   ↓
Deployment
```

------------------------------------------------------------------------

# Things I Should Learn Along the Way

## TypeScript

Learn while building:

-   Types
-   Interfaces
-   Unions
-   Generics
-   Type narrowing
-   React typing
-   API typing

## Backend

Deepen:

-   Express middleware
-   REST API design
-   Authentication
-   Authorization
-   Error handling
-   Validation
-   Database relationships
-   Transactions/atomic operations where needed

## Database

Learn:

-   Indexes
-   References
-   Embedded documents
-   Aggregation
-   Pagination
-   Query optimization

## Frontend

Deepen:

-   Component design
-   Context
-   Custom hooks
-   Forms
-   Routing
-   API state
-   Error/loading states

## Software Engineering

Learn:

-   Git branching
-   Code organization
-   Testing
-   Environment configuration
-   Security
-   Deployment
-   CI/CD

------------------------------------------------------------------------

# Technologies NOT Required Initially

Do not add these just because they are popular:

-   Redux
-   GraphQL
-   Microservices
-   Kubernetes
-   Kafka
-   Redis
-   Docker
-   Next.js

They can be learned later when there is a real reason to use them.

The objective is not:

> Use as many technologies as possible.

The objective is:

> Build a complete application and understand why each technology is
> being used.

------------------------------------------------------------------------

# Final Definition of Done

The project is considered complete when:

-   [ ] Customer registration works.
-   [ ] Customer login works.
-   [ ] Authentication persists correctly.
-   [ ] Protected routes work.
-   [ ] Role-based authorization works.
-   [ ] Shop owners can create/manage shops.
-   [ ] Shop owners can manage products.
-   [ ] Customers can search/filter products.
-   [ ] Customers can use a cart.
-   [ ] Customers can place orders.
-   [ ] Server calculates order totals.
-   [ ] Stock is validated.
-   [ ] Shop owners can manage orders.
-   [ ] Delivery workers can manage deliveries.
-   [ ] Admin dashboard works.
-   [ ] Reviews work if included.
-   [ ] Images work.
-   [ ] Real-time order updates work if included.
-   [ ] Validation works.
-   [ ] Error handling works.
-   [ ] Important API endpoints are tested.
-   [ ] Security has been reviewed.
-   [ ] Application is deployed.
-   [ ] CI/CD is configured if included.
-   [ ] README is complete.
-   [ ] No secrets are committed.
-   [ ] The complete customer → shop → delivery workflow works.

------------------------------------------------------------------------

# The Main Rule

Build vertically, not horizontally.

Do not spend three weeks building every frontend page and then start the
backend.

Instead, build one complete feature from frontend to database.

For example:

``` text
Register
React
  ↓
Express
  ↓
MongoDB
  ↓
Response
  ↓
React
```

Then:

``` text
Create Product
React
  ↓
Express
  ↓
Mongoose
  ↓
MongoDB
  ↓
React
```

Then:

``` text
Create Order
React
  ↓
Express
  ↓
Validate
  ↓
MongoDB
  ↓
Shop Dashboard
```

This keeps the application working throughout development and makes it
much easier to understand how the pieces connect.

------------------------------------------------------------------------

# Final Target

At the end, I should be able to explain:

1.  How React communicates with the backend.
2.  How an HTTP request travels through Express.
3.  How authentication works.
4.  How JWTs/cookies are used.
5.  How authorization prevents unauthorized actions.
6.  How Mongoose communicates with MongoDB.
7.  How the database models relate to each other.
8.  How an order moves through the system.
9.  How real-time updates work.
10. How the application is tested.
11. How the application is deployed.
12. Why each major technology was chosen.

If I can explain those things, the project has achieved its purpose.
