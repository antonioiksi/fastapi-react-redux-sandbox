import uvicorn
from app.api.api_v1.main import api_router
from fastapi import FastAPI
import logging

app = FastAPI(docs_url="/api/docs", openapi_url="/api")
app.include_router(api_router)

logging.basicConfig(
    filename="app/sample.log",
    level=logging.INFO,
    filemode="w",
    format="%(asctime)s - %(levelname)s - %(funcName)s: %(lineno)d - %(message)s",
    datefmt="%H:%M:%S",
)

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8080, reload=True)

# uvicorn example:app --reload --port 5000.
