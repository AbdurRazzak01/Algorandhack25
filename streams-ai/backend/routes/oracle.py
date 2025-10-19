from fastapi import APIRouter

oracle_bp = APIRouter()

@oracle_bp.get("/oracle")
def get_oracle_price():
    dummy_price = 123.45
    return {"price": dummy_price}
