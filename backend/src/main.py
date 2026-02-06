from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI(title="Ecommerce Backend API")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models
class Product(BaseModel):
    id: int
    name: str
    description: str
    price: float
    stock: int

# Mock data - no database needed
products_db: List[Product] = [
    Product(
        id=1,
        name="Laptop",
        description="High performance laptop",
        price=999.99,
        stock=10
    ),
    Product(
        id=2,
        name="Smartphone",
        description="Latest smartphone",
        price=699.99,
        stock=25
    ),
    Product(
        id=3,
        name="Headphones",
        description="Noise cancelling headphones",
        price=199.99,
        stock=50
    ),
    Product(
        id=4,
        name="Smartwatch",
        description="Fitness tracking smartwatch",
        price=299.99,
        stock=30
    ),
    Product(
        id=5,
        name="Tablet",
        description="10-inch tablet",
        price=449.99,
        stock=15
    ),
    Product(
        id=6,
        name="Camera",
        description="Digital camera 4K",
        price=799.99,
        stock=8
    ),
]

# Routes
@app.get("/")
async def root():
    return {"message": "Ecommerce Backend API", "version": "1.0.0"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "backend"}

@app.get("/products", response_model=List[Product])
async def get_products():
    """Get all products"""
    return products_db

@app.get("/products/{product_id}", response_model=Product)
async def get_product(product_id: int):
    """Get a single product by ID"""
    for product in products_db:
        if product.id == product_id:
            return product
    raise HTTPException(status_code=404, detail="Product not found")

@app.get("/products/search/{query}")
async def search_products(query: str):
    """Search products by name"""
    results = [
        product for product in products_db
        if query.lower() in product.name.lower()
    ]
    return results

# For local testing
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=3000)