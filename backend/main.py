from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json
from pathlib import Path

app = FastAPI(title="TrustGraph API")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load mock data
MOCK_DATA_PATH = Path(__file__).parent.parent.parent / "mockdata" / "graph_mock.json"

with open(MOCK_DATA_PATH) as f:
    GRAPH_DATA = json.load(f)


@app.get("/")
def root():
    return {"message": "TrustGraph API", "status": "running"}


@app.get("/graph")
def get_graph():
    """Return full graph data"""
    return GRAPH_DATA


@app.get("/profile/{profile_id}")
def get_profile(profile_id: str):
    """Get single profile by ID"""
    node = next((n for n in GRAPH_DATA["nodes"] if n["id"] == profile_id), None)
    if not node:
        return {"error": "Profile not found"}
    return node