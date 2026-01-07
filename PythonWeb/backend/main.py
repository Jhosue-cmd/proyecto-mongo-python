from fastapi import FastAPI
from pymongo import MongoClient
from fastapi.middleware.cors import CORSMiddleware
from bson import ObjectId

app = FastAPI()

# 1. CORS Configuration
# Allow the React frontend to communicate with this backend
origins = [
    "http://localhost:5173",
    "http://localhost:5174",  # <--- Agregamos tu puerto actual
    "http://localhost:5175",
    "http://localhost:3000",
    "https://fronted-python-g2b9.onrender.com",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 2. Database Connection (MongoDB Atlas)
# Using the connection string you provided
uri = "mongodb+srv://oop:oop@cluster0.9knxc.mongodb.net/?appName=Cluster0"

try:
    client = MongoClient(uri)
    # Trigger a dummy command to verify connection immediately
    client.admin.command('ping')
    print("Successfully connected to MongoDB Atlas!")
except Exception as e:
    print(f"Error connecting to MongoDB: {e}")

# Select Database 'oop' and Collection 'Customers'
db = client["oop"]
collection = db["Customers"]

# Helper function: Convert MongoDB document to a JSON-friendly dictionary
def customer_helper(customer) -> dict:
    return {
        "uid": str(customer["_id"]),
        "id": customer.get("id"),
        "fullName": customer.get("fullName"),
        "email": customer.get("email"),
        "type": customer.get("type"),
        "discount": customer.get("discount"),
        "totalSale": customer.get("totalSale")
    }

# 3. Routes
@app.get("/")
def read_root():
    return {"message": "API is running and connected to Atlas"}

@app.get("/api/customers")
def get_customers():
    customers = []
    # Fetch all documents from the collection
    for data in collection.find():
        customers.append(customer_helper(data))
    return customers