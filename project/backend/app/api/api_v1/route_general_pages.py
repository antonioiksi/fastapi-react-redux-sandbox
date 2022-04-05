from fastapi import APIRouter, Body
from app.core.config import JWT_SECRET, JWT_ALGORITHM
from app.auth.auth_handler import signJWT


import logging, jwt

general_router = APIRouter()


@general_router.get("/")
def read_root():
    return {"message": "Welcome to your API blog!."}


@general_router.post("/update")
def update_token(token: str = Body(...)):
    decoded_token = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
    user_id = decoded_token["user_id"]
    logging.info("Update token for user [%s]", user_id)
    return signJWT(user_id)
