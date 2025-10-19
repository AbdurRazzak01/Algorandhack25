from fastapi import APIRouter
from pydantic import BaseModel

guardian_bp = APIRouter()

class GuardianAction(BaseModel):
    action: str

@guardian_bp.post("/guardian")
def guardian(request: GuardianAction):
    return {"status": "guardian_action_executed", "action": request.action}
