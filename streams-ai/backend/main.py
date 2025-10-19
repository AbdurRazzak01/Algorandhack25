from fastapi import FastAPI
from backend.routes.mint import mint_bp
from backend.routes.redeem import redeem_bp
from backend.routes.oracle import oracle_bp
from backend.routes.guardian import guardian_bp
from backend.routes.status import status_bp

app = FastAPI()

app.include_router(mint_bp)
app.include_router(redeem_bp)
app.include_router(oracle_bp)
app.include_router(guardian_bp)
app.include_router(status_bp)

@app.get("/")
def index():
    return {"message": "Streams-AI backend is running ✅"}
