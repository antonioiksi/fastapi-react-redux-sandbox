import uvicorn
from app.api.api_v1.main import api_router, tags_metadata
from fastapi import FastAPI
import logging

description = """
Fastapi-jwt API helps you do awesome stuff. 🚀

## Users

You will be able to:

* **Create users**.
* **Login user**.
* **Logout user**. 

## Posts

You will be able to:

* **Add post**.
* **Delete post** (_not implemented_).
"""

app = FastAPI(
    title="Fastapi-jwt",
    version="0.0.1",
    description=description,
    docs_url="/api/docs",
    openapi_url="/api",
    openapi_tags=tags_metadata,
    contact={
        "name": "Sasha the Amazing and Dima the Fantastic",
        "email": "peryevd1@gmail.com",
    },
)

app.include_router(api_router)

logging.basicConfig(
    filename="logs/sample.log",
    level=logging.INFO,
    filemode="w",
    format="%(asctime)s - %(levelname)s - %(funcName)s: %(lineno)d - %(message)s",
    datefmt="%H:%M:%S",
)

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8080, reload=True)
