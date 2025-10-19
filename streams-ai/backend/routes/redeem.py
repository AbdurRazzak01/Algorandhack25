from fastapi import APIRouter
from pydantic import BaseModel

redeem_bp = APIRouter()

class RedeemRequest(BaseModel):
    amount: float

@redeem_bp.post("/redeem")
def redeem(request: RedeemRequest):
    return {"status": "success", "redeemed": request.amount}
