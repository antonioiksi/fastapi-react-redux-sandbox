from fastapi import APIRouter, Depends, Request, HTTPException
from app.core.config import JWT_SECRET, JWT_ALGORITHM
from app.core.auth.auth_handler import signJWT
from app.core.auth.auth_handler import decodeJWT
from app.db.models.session import Session
from app.db.session import session
from app.core.auth.auth_bearer import JWTBearer


import logging
import jwt

general_router = APIRouter()


@general_router.get("/")
def read_root():
    return {"message": "Welcome to your API blog!!!!."}


@general_router.get("/update", dependencies=[Depends(JWTBearer())])
def update_token(request: Request):
    token = request.headers.get("Authorization").replace("Bearer ", "")
    decoded_token = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
    user_id = decoded_token["user_id"]

    new_token = signJWT(user_id)["access_token"]
    try:
        row = session.query(Session).filter_by(user_id=user_id).first()
        row.token = new_token.decode("utf8")
        session.commit()
        logging.info("User [%s] session update", user_id)
        return new_token
    except:
        logging.error("Session for user [%s] does not found", user_id)
        raise HTTPException(status_code=404, detail="session does not found")


@general_router.get("/session")
def get_session():
    users = session.query(Session).all()
    logging.info("Get Session [%s]", id)
    return users


def check_session(token):
    try:
        decodeJWT(token)
        if session.query(Session).filter_by(token=token).first():
            return True
    except:
        return False
    return False
