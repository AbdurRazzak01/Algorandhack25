# backend/chat.py
import os, json
from fastapi import APIRouter, Request
from openai import OpenAI

# Load environment variables (if not already done)
from dotenv import load_dotenv
load_dotenv()

router = APIRouter(prefix="/chat", tags=["agent"])

# OpenAI client
client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

@router.post("/")
async def chat_endpoint(req: Request):
    """Handles a chat message from frontend and replies with an AI suggestion"""
    body = await req.json()
    user_messages = body.get("messages", [])

    # Load local user subscription data
    with open("data/subscriptions.json") as f:
        data = json.load(f)

    messages = [
        {
            "role": "system",
            "content": (
                "You are StreamSmart.AI — an expert subscription management agent. "
                "You analyze usage data, recommend switching plans, "
                "or offer stream-based payment optimization. "
                "Use this user's context:\n\n"
                f"{json.dumps(data['user'], indent=2)}"
            )
        }
    ] + user_messages

    # Call OpenAI
    completion = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=messages
    )

    reply = completion.choices[0].message.content
    return {"reply": reply}
