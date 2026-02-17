# 👨‍💻 Nilu Kadam  
**Frontend Engineer | React System Architecture & Scalable UI Design**

I build structured, maintainable, and production-ready React applications that simulate real-world product behavior — not just UI screens.

---

# 📚 BookNest — Production-Structured React E-Commerce Frontend

A system-focused React SPA engineered to simulate a real-world purchase lifecycle — from authentication to order confirmation — with scalable state architecture and deployment-ready routing behavior.

---

## 🔗 Live Demo
https://book-store-frontend-five-mauve.vercel.app/

## 🔗 Repository
https://github.com/nilukadam/book-store-frontend

---

## 🛠 Tech Stack

- React (Functional Components)
- React Router
- Context API (Domain-Separated State)
- Custom Hooks
- Vite
- Bootstrap + Custom CSS
- LocalStorage (State Persistence)
- Vercel (Production Deployment)

---

## 🖼 Application Preview

### 🏠 Home Page
![Home Page](./screenshots/home.png)

### 📖 Product on Home Page
![Product Details](./screenshots/home1.png)

### 🛒 Cart System
![Cart Page](./screenshots/cart.png)

### 📦 Orders & Confirmation Flow
![Orders Page](./screenshots/orders.png)

---

## 🎯 Project Positioning

BookNest is not a UI-only demo.  
It is a frontend-engineered e-commerce system designed to demonstrate:

- Scalable domain-based state management  
- Route-level access control  
- Persistent authentication flow  
- Modular logic isolation via custom hooks  
- SPA routing configured for production deployment  
- Clean separation of UI, logic, and state layers  

The architecture is structured to support backend integration without structural refactoring.

---

## 🚀 Core Functional Systems

### 🔐 Authentication System
- Simulated login and logout flow  
- Persistent session handling using LocalStorage  
- Protected routes with navigation guards  
- Auth-aware UI rendering  

### 📚 Product System
- Dynamic product rendering from dataset  
- Search, filter, and sort functionality  
- Route parameter-based product detail pages  
- Responsive grid layout  

### 🛒 Cart System
- Add / Remove products  
- Quantity management  
- Real-time price calculations  
- Derived cart calculations abstracted via custom hooks  
- Global synchronization across views  

### 📦 Order System
- Simulated checkout flow  
- Order confirmation lifecycle  
- Order history tracking  
- State reset after successful purchase  

---

## 🧠 Architectural Decisions

### 1️⃣ Domain-Based State Separation
State responsibilities are isolated by domain:

- `CartContext` → Cart logic & calculations  
- `OrderContext` → Order lifecycle management  

This prevents cross-domain coupling and keeps business logic modular and scalable.

### 2️⃣ Custom Hooks for Logic Isolation
Reusable business logic is abstracted into:

- `useAuth` → Authentication persistence & validation  
- `useCartSummary` → Derived cart calculations  

Components remain UI-focused while logic stays reusable and testable.

### 3️⃣ Protected Routing Strategy
A custom `ProtectedRoute` layer ensures:

- Route-level access control  
- Authentication-aware rendering  
- Consistent redirect behavior  

Simulates real-world authorization flow within a frontend-only environment.

### 4️⃣ Persistent State Handling
- Login state persisted via LocalStorage  
- Cart state maintained across refresh  
- SPA routing configured using `vercel.json` to prevent 404 errors on reload  

Ensures production-like behavior in deployed environment.

---

## 🗂 Scalable Folder Architecture

```bash
src/
  assets/
  components/
    Navbar/
    ui/
  context/
  hooks/
  pages/
  data/
  style/
  utils/
  App.jsx
  main.jsx
