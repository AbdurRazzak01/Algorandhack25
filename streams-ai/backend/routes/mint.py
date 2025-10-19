from fastapi import APIRouter
from pydantic import BaseModel

mint_bp = APIRouter()

class MintRequest(BaseModel):
    amount: float

@mint_bp.post("/mint")
def mint(request: MintRequest):
    return {"status": "success", "minted": request.amount}
