
# Mini E-Commerce Website 

## Overview

This project is a **mini e-commerce web application** built using **React** (or Vue, if you choose Vue). It consumes a public e-commerce API ([Fake Store API](https://fakestoreapi.com/)) and demonstrates a modern SPA with routing, global state management, and shopping cart functionality.

The main objectives of this project include:

* Structuring a modern Single Page Application (SPA)
* Fetching, caching, and managing remote data
* Implementing shopping cart and checkout flow
* Handling loading states, errors, and edge cases
* Following framework best practices
* Managing global application state effectively

---

## Features

### 1. Product Listing (`/`)

* Displays all products in a **responsive grid** (image, title, price)
* Search box to filter products by title
* Category dropdown to filter by categories
* Shows **loading indicators** and handles fetch errors

### 2. Product Detail (`/product/:id`)

* Displays product images, title, full description, price, and rating
* "Add to Cart" feature with **quantity selector (1–5)**

### 3. Shopping Cart (`/cart`)

* Lists added items with thumbnail, title, unit price, quantity selector (1–10), and subtotal
* Allows **item removal** and quantity updates
* Displays **grand total** and "Proceed to Checkout" button

### 4. Checkout (`/checkout`)

* Order summary (items + total)
* Simple **form**: name, email, address with validation
* "Place Order" clears cart and shows confirmation

### 5. Data Caching

* Product lists/details cached in **memory/localStorage** to reduce redundant API fetches

### 6. State Management

* Uses **Redux** (or Vuex/Pinia for Vue) to manage global application state

---

## Project Structure

```
src/
├─ components/        # Reusable UI components
├─ hooks/             # Custom React hooks (or composables in Vue)
├─ stores/            # Global state management (Redux/Vuex/Pinia)
├─ pages/             # Main pages: Home, Product, Cart, Checkout
├─ router/            # Application routing
├─ assets/            # Images, icons, styles
└─ utils/             # Helper functions, API services
```

---

## Setup & Run

1. Clone the repository:

```bash
git clone https://github.com/username/repo-name.git
cd repo-name
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open your browser at `http://localhost:3000` (or specified port)

---

## Design Decisions & Trade-offs

* **State Management:** Used Redux for predictable global state management
* **Data Caching:** Cached product details in `localStorage` to reduce API calls
* **Error Handling:** Implemented loading and error states for a smooth user experience
* **Component Hierarchy:** Followed clean separation of pages, components, and utilities
* **Form Validation:** Simple client-side validation on checkout form

---

## Deployment

* Live demo: \[Add your deployed URL here]

---

## Scripts

| Script          | Description                 |
| --------------- | --------------------------- |
| `npm install`   | Installs dependencies       |
| `npm run dev`   | Starts development server   |
| `npm run build` | Builds production-ready app |
| `npm run test`  | Runs tests (if implemented) |

---

## Screenshots
<img width="1364" height="664" alt="image" src="https://github.com/user-attachments/assets/7cbf1b99-8f3e-4282-abd3-f942e1fa13ec" />
<img width="1366" height="653" alt="image" src="https://github.com/user-attachments/assets/32977865-aa31-43e5-88b0-801b17f9c67b" />
<img width="1365" height="657" alt="image" src="https://github.com/user-attachments/assets/831d1c76-cf59-4030-8b40-50e1281be14a" />
<img width="1366" height="659" alt="image" src="https://github.com/user-attachments/assets/fcb3a2e1-c09d-4266-a298-ebcb78ad60b6" />
<img width="1362" height="629" alt="image" src="https://github.com/user-attachments/assets/600f2764-e2ec-4f40-bd5c-bdebafa0cd4e" />
<img width="1360" height="659" alt="image" src="https://github.com/user-attachments/assets/f13c248c-3bc4-4682-bdc0-81b4fc589a5f" />
<img width="1359" height="475" alt="image" src="https://github.com/user-attachments/assets/27e31c43-aada-4124-937d-02e542ff2f44" />




