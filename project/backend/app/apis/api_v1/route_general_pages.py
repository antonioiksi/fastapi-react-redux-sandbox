from fastapi import APIRouter, Body

general_router = APIRouter()

from decouple import config
from app.auth.auth_handler import signJWT
import logging, jwt

JWT_SECRET = config("secret")
JWT_ALGORITHM = config("algorithm")

user_router = APIRouter()


@general_router.get("/")
def read_root():
    return {"message": "Welcome to your API blog!."}


@general_router.post("/update")
def update_token(token: str = Body(...)):
    decoded_token = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
    user_id = decoded_token["user_id"]
    logging.info("Update token for user [%s]", user_id)
    return signJWT(user_id)
