import uvicorn
from app.apis.base import api_router
from fastapi import FastAPI


app = FastAPI(docs_url="/api/docs", openapi_url="/api")
app.include_router(api_router)


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8080, reload=True)

# uvicorn example:app --reload --port 5000.
