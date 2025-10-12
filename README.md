# ECommerce

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.0.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Project Structure - frontend

✅ Project Structure Overview
ecommerce-app/
├── src/
│ ├── app/
│ │ ├── core/ # Core services (singleton)
│ │ ├── shared/ # Shared components, pipes, directives
│ │ ├── auth/ # Login & registration
│ │ ├── home/ # Homepage
│ │ ├── products/ # Product listing, details
│ │ ├── cart/ # Shopping cart
│ │ ├── checkout/ # Payment / address
│ │ ├── orders/ # Past orders / order success
│ │ ├── store/ (optional) # NgRx Store
│ │ ├── app-routing.module.ts # Main router with lazy loading
│ │ ├── app.module.ts # Root module
│ └── ...

🧱 1. Core Module (core/)

Used for singleton services, guards, interceptors, etc.

Include:

auth.service.ts

token.interceptor.ts

auth.guard.ts

http-error.interceptor.ts

core.module.ts

@NgModule({
providers: [AuthService, AuthGuard, TokenInterceptor]
})
export class CoreModule {}

✅ Load once in AppModule.

📦 2. Shared Module (shared/)

Used for reusable components, pipes, directives.

Include:

Components: product-card, navbar, footer

Pipes: currencyPipe, truncatePipe

Directives (optional)

@NgModule({
declarations: [ProductCardComponent, TruncatePipe],
exports: [ProductCardComponent, TruncatePipe],
})
export class SharedModule {}

✅ Import in feature modules as needed.

🔐 3. Auth Module (auth/)

Features:

Login

Registration

Forgot password (optional)

Routing: /login, /register

✅ Lazy load this module in routing.

🏠 4. Home Module (home/)

Homepage (e.g., banners, categories)

Route: /

✅ Lazy load this module.

🛍️ 5. Products Module (products/)

Features:

Product list

Product details

Filtering/sorting

Routes:

/products

/products/:id

✅ Lazy load, and use route resolvers if needed for fetching product data.

🛒 6. Cart Module (cart/)

Features:

Add/remove items

Total price calculation

Route: /cart

💳 7. Checkout Module (checkout/)

Features:

Address input form

Payment method (mock or Stripe)

Order summary

Route: /checkout

✅ Protect with route guard (only if cart has items)

📦 8. Orders Module (orders/)

Features:

View past orders

Order confirmation

Routes:

/orders

/order-success

🧠 9. State Management (store/ or via RxJS services)

Choose NgRx if you want to learn Redux pattern. Otherwise use BehaviorSubject for simpler state.

For NgRx, include:

store/
├── actions/
├── reducers/
├── selectors/
├── effects/

You can manage:

Auth state

Cart state

Orders state

📁 10. App Routing (Lazy Loaded)

In app-routing.module.ts:

const routes: Routes = [
{ path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
{ path: 'login', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
{ path: 'products', loadChildren: () => import('./products/products.module').then(m => m.ProductsModule) },
{ path: 'cart', loadChildren: () => import('./cart/cart.module').then(m => m.CartModule), canActivate: [AuthGuard] },
{ path: 'checkout', loadChildren: () => import('./checkout/checkout.module').then(m => m.CheckoutModule), canActivate: [AuthGuard] },
{ path: 'orders', loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule), canActivate: [AuthGuard] },
];

🛠️ Key Features to Include
✅ Routing & Navigation

Use Angular Router with lazy loading

Use routerLinkActive for active menu styling

✅ Authentication

JWT based (store token in localStorage)

AuthService in core/

✅ Route Guards

AuthGuard to protect checkout, cart, orders

✅ HTTP Interceptors

Add JWT token to headers

Handle errors globally

✅ Reactive Forms

Use for login, register, address, payment

✅ Pipes

Currency, truncate, custom status

✅ RxJS or NgRx

Use BehaviorSubject or NgRx Store for managing cart and auth state

📌 Sample Lazy-Loaded Module: Products
@NgModule({
declarations: [ProductListComponent, ProductDetailComponent],
imports: [
CommonModule,
ProductsRoutingModule,
SharedModule
]
})
export class ProductsModule {}

## Project Structure (Backend)

✅ Full API List for Your Angular eCommerce Site (Node.js Backend)

Here’s a complete and categorized breakdown of the APIs you’ll need to build:

🔐 1. Auth APIs (Login, Register, Forgot Password, Tokens)
Method Endpoint Description
POST /api/auth/register Register a new user
POST /api/auth/login Log in and get JWT token
POST /api/auth/forgot-password Send password reset email (optional)
POST /api/auth/reset-password/:token Reset password using token
GET /api/auth/me Get current logged-in user (token)
👤 2. User APIs
Method Endpoint Description
GET /api/users/:id Get user by ID
PUT /api/users/:id Update user profile
GET /api/users/history Get logged-in user’s order history
🛍️ 3. Product APIs (View, Search, Filter, Buy)
Method Endpoint Description
GET /api/products Get all products
GET /api/products/:id Get single product details
GET /api/products/search?q=term Search products by name/keyword
GET /api/products/category/:categoryName Filter by category
GET /api/products/price?min=0&max=1000 Filter by price range

✅ You can combine search + filters in one endpoint if needed.

🛒 4. Cart APIs
Method Endpoint Description
GET /api/cart Get user’s cart
POST /api/cart Add item to cart
PUT /api/cart/:itemId Update quantity
DELETE /api/cart/:itemId Remove item from cart
DELETE /api/cart Clear entire cart
💳 5. Checkout / Payment APIs
Method Endpoint Description
POST /api/checkout Create order from cart
GET /api/checkout/summary Get summary before payment
POST /api/payment Process payment (mock or Stripe)
📦 6. Orders / History APIs
Method Endpoint Description
GET /api/orders Get all past orders of a user
GET /api/orders/:id Get single order detail
POST /api/orders Create new order (after checkout)
🛡️ 7. Token / JWT-Based Security

All protected routes (e.g., /api/cart, /api/orders) should require JWT tokens in headers:

Authorization: Bearer <your_token>

You’ll need:

auth.middleware.js to verify tokens

Role-based middleware if needed (isAdmin, etc.)

🚀 8. Lazy Loading Support for Angular

No backend-specific change needed — but design your APIs so they return paginated results:

Example: Paginated products
GET /api/products?page=1&limit=10

Response:

{
"products": [/* 10 products */],
"total": 42,
"page": 1,
"pages": 5
}

🧠 Bonus: Admin APIs (Optional Later)
Method Endpoint Description
POST /api/products Add new product
PUT /api/products/:id Update product
DELETE /api/products/:id Delete product
GET /api/users List all users (admin only)
✅ Summary Table
Category Total APIs
Auth 5
User 3
Products 5–8
Cart 5
Orders 3
Payment 2–3
Admin Optional
✅ Next Step

Would you like me to:

Help you start coding these APIs one by one?

Generate a starter Node.js API project with all folders set up?

Or connect your Angular frontend to these endpoints?

Let me know how you'd like to proceed!
