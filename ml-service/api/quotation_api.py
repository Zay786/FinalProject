from fastapi import FastAPI
from fastapi.responses import FileResponse
from pydantic import BaseModel
import random
from reportlab.pdfgen import canvas
import uuid
import os

app = FastAPI()

class QuoteRequest(BaseModel):
    name: str
    company: str
    email: str
    origin: str
    destination: str
    commodity: str
    weight: float
    service: str

@app.post("/generate")
def generate_quote(data: QuoteRequest):

    # 🔹 Fake ML prediction (replace later)
    base_price = random.randint(1000, 5000)
    price = base_price + (data.weight * 50)

    # 🔹 Create PDF
    file_name = f"quotation_{uuid.uuid4().hex}.pdf"
    file_path = f"ml-service/pdf/{file_name}"

    os.makedirs("ml-service/pdf", exist_ok=True)

    c = canvas.Canvas(file_path)

    c.drawString(100, 750, "TOM & JERRY LOGISTICS QUOTATION")
    c.drawString(100, 720, f"Customer: {data.name}")
    c.drawString(100, 700, f"Company: {data.company}")
    c.drawString(100, 680, f"Origin: {data.origin}")
    c.drawString(100, 660, f"Destination: {data.destination}")
    c.drawString(100, 640, f"Commodity: {data.commodity}")
    c.drawString(100, 620, f"Weight: {data.weight} Tons")
    c.drawString(100, 600, f"Service: {data.service}")
    c.drawString(100, 560, f"Estimated Price: ${price}")

    c.save()

    return {
        "price": price,
        "pdf_url": f"http://127.0.0.1:8001/download/{file_name}"
    }

@app.get("/download/{file_name}")
def download_file(file_name: str):
    file_path = f"ml-service/pdf/{file_name}"
    return FileResponse(file_path, media_type='application/pdf', filename=file_name)