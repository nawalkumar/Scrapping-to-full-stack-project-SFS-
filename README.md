This project demonstrates end-to-end image data processing:

      Scraping images and metadata from school websites using Selenium.
      
      Assigning labels to images with confidence scores.
      
      Storing metadata in a structured CSV file.
      
      Serving scraped data and images via a Node.js + Express API.
      
      Displaying categorized images in a React frontend as image cards.

📂 Project Structure
            project-root/
            │
            ├── backend/                     # Express.js backend
            │   ├── config/                  # MongoDB connection (if required for auth)
            │   ├── routes/                  # Express route handlers
            │   │   ├── auth.js              # User authentication routes
            │   │   └── categorization.js    # CSV → API for images
            │   ├── server.js                # Backend entry point
            │   └── package.json
            │
            ├── frontend/                    # React frontend
            │   ├── src/
            │   │   ├── components/          # Reusable components
            │   │   │   └── Categorization.jsx
            │   │   │   └── Navbar.jsx
            │   ├── package.json
            │
            ├── scrap_to_render/             # Scraping results
            │   ├── categorized_school_images_with_confidence1.csv   # Scraped CSV
            │   └── downloaded_images/       # Downloaded images
            │
            └── README.md

🚀 Workflow
1️⃣ Web Scraping (Selenium)

            Used Selenium to scrape:
            
            Image URL
            
            Alt text
            
            Website source
            
            Each image was passed through a confidence-based classifier to assign a Category label.

👉 Final data stored in:
          /scrap_to_render/categorized_school_images_with_confidence1.csv
          
          CSV Columns:
          | ID | Website | Image_URL | Alt_Text | Detected_Labels | Category | Local_File |
          
          Images are downloaded into:
          /scrap_to_render/downloaded_images/

2️⃣ Backend (Node.js + Express)

        Static Serving: Local images served at:
        
        http://localhost:5000/images/<filename>
        
        
        CSV → JSON API:
        GET /api/categorization
        Returns all rows from the CSV with metadata and local image paths.

📌 Example JSON Response:

        [
          {
            "id": "1",
            "website": "https://example-school.com",
            "imageUrl": "https://example.com/logo.png",
            "altText": "School Logo",
            "labels": "Logo, Education",
            "category": "Logo",
            "localFile": "logo.png",
            "imagePath": "/images/logo.png"
          }
        ]

3️⃣ Frontend (React + Axios)

      Built with React + Vite.
      
      Navbar: Basic navigation (Login, Register, Dashboard, Categorization).
      
      Categorization.jsx:
      
      Fetches data from /api/categorization.
      
      Displays each row in a card with:
      
      Image
      
      Category
      
      School name (from Website column).

📌 Example Card:

        [Image]
        School: Example School
        Category: Logo
        
        ⚙️ Setup Instructions
        1. Clone Repository
        git clone <repo-url>
        cd project-root
        
        2. Install Dependencies
        
        Backend
        
        cd backend
        npm install
        
        
        Frontend
        
        cd ../frontend
        npm install
        
        3. Run Servers
        
        Backend
        
        cd backend
        node server.js
        
        
        Server runs on:
        http://localhost:5000
        
        Frontend
        
        cd frontend
        npm run dev
        
        
        Frontend runs on:
        http://localhost:5173

🔮 Future Improvements

      Store scraped data directly into MongoDB instead of CSV.
      
      Add search & filter by category/school in frontend.
      
      Enhance image classification model for more accurate labels.
      
      Deploy backend (Node.js) + frontend (React) to cloud platforms.

📌 Tech Stack

      Scraping: Selenium (Python)
      
      Backend: Node.js, Express, CSV-parser
      
      Database: MongoDB (for user auth)

Frontend: React, Vite, Axios, TailwindCSS

Others: CORS, dotenv

Would you like me to also include sample React code for Categorization.jsx inside this README (so someone cloning can directly use it), or keep README only for documentation?
