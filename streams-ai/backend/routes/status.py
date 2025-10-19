from fastapi import APIRouter

status_bp = APIRouter()

@status_bp.get("/status")
def system_status():
    return {"system": "online", "message": "All services are running"}
