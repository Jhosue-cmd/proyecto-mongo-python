from fastapi import FastAPI
from pymongo import MongoClient
from fastapi.middleware.cors import CORSMiddleware
from bson import ObjectId

app = FastAPI()


# Allow the React frontend to communicate with this backend
origins = [
    "http://localhost:5173",
    "http://localhost:5174", 
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


uri = "mongodb+srv://oop:oop@cluster0.9knxc.mongodb.net/?appName=Cluster0"

try:
    client = MongoClient(uri)
    
    client.admin.command('ping')
    print("Successfully connected to MongoDB Atlas!")
except Exception as e:
    print(f"Error connecting to MongoDB: {e}")


db = client["oop"]
collection = db["Customers"]

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


@app.get("/")
def read_root():
    return {"message": "API is running and connected to Atlas"}

@app.get("/api/customers")
def get_customers():
    customers = []
 
    for data in collection.find():
        customers.append(customer_helper(data))
    return customers