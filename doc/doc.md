1.  Product Listing Page (/)
Fetch from https://dummyjson.com/products
Show: title, price, rating, category, image in each product card,
Add a "Add to Favorite" button in each product card to favorite/unfavorite a product by the user, use redux to store all favorite products.
Add:
On scroll Pagination (use ?limit=10&skip=10)
Search bar (will be a bonus)
2. Product Details Page (/product/[id])
Fetch individual product: /products/:id
Show detailed info, price, images, brand, stock and rating
3. Favorites Page (/favorites)
Users can favorite/unfavorite products
Use Redux Toolkit to manage favorite list
4. Create Product
Form to add a new product
Fields: title, description, price, stock, brand, category
POST to https://dummyjson.com/products/add
5. Edit Product:
Pre-filled form for editing
Patch to https://dummyjson.com/products/:id
6. Delete Product
DELETE request to https://dummyjson.com/products/:id
Ask confirmation before deletion
7. Bonus (Optional but Impressive)
Add toast notifications (e.g., sonner, react-hot-toast)
Show loading and error states properly
 API Endpoints
1.All products: GET /products
2. Search products: GET /products/search?q=phone
3. Get product by ID: GET /products/:id
4. Get all categories: GET /products/categories
5. Get by category: GET /products/category/:category
6. Create product: POST /products/add
7. Update productPUT /products/:id
8. Delete productDELETE /products/:id


you can get the categories 

GET https://dummyjson.com/products/categories




"UNDER THIS IS THE TEST REQUIREMENT "



Hi Tizazab,
 
Thank you for interviewing for the Frontend Developer role at Ellatech. Ahead of our meeting, we’d like you to complete a short take-home exercise aligned with our frontend stack.
 
Assignment
Build a small React Native app (Expo + NativeWind) that simulates user and product management using local state (no backend required).
 
Required Features
 
Register a User – capture email and full name
 
Register a Product – capture SKU, name, price, and quantity
 
Adjust Product Stock – increase or decrease quantity (stock cannot go negative)
 
View Product Status – display SKU, quantity, and last updated time
 
Transaction History – list all changes with simple pagination
 
Requirements
 
Use React hooks (useState, useEffect) for state management
 
Style with NativeWind
 
Include basic validation and error handling
 
No backend integration needed (simulate API behaviour with local state)
 
Deliverables
 
GitHub repository link
 
README with setup and run instructions (npm install && npm start)
 
Short note explaining your approach and trade-offs
 
Timebox & Deadline
Please aim for 3–5 hours of effort. note that this time box is an indication of the expected amount of time to complete the task, so take as much time as you need within the deadline mentioned below.
 
Submit your GitHub link by Saturday, 22 November 2025.
 
What We Will Discuss in the Interview
 
Component structure and state management
 
Styling and usability with NativeWind
 
Your design choices and what you would improve with more time
 
If anything is unclear, please feel free to reply to this email.
 
Best regards,
Kam Ephrem
CTO
Ellatech