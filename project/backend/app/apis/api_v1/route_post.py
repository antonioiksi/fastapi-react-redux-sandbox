from fastapi import Body, Depends, Request, HTTPException, APIRouter
import os

from app.models.posts import Posts, Session

from app.auth.auth_bearer import JWTBearer
from app.auth.auth_handler import signJWT
from app.auth.auth_handler import decodeJWT
from app.schemas.posts import PostBase
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine, delete
from sqlalchemy.orm import sessionmaker
from app.schemas.users import UserBase, UserLoginSchema, UserModel

import logging, jwt, bcrypt

from decouple import config
import logging, jwt, bcrypt

JWT_SECRET = config("secret")
JWT_ALGORITHM = config("algorithm")

post_router = APIRouter()

Base = declarative_base()
# engine = create_engine("postgresql+psycopg2://dimka:12345678@localhost/sqlalchemy_tuts")
database_url = os.getenv("DATABASE_URL")
engine = create_engine(database_url)
Session_local = sessionmaker(bind=engine)
session = Session_local()

post_router = APIRouter()


@post_router.post("/posts", dependencies=[Depends(JWTBearer())])
def add_post(post: PostBase, request: Request) -> dict:
    token = request.headers.get("Authorization").replace("Bearer ", "")
    if check_session(token):
        decoded_token = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        user_id = decoded_token["user_id"]

        new_post = Posts(title=post.title, text=post.text, user_id=user_id)
        session.add(new_post)
        session.commit()
        logging.info("Add new post from user [%s]" % (user_id))
        return {"data": "post added"}
    logging.error("Get invalid token")
    raise HTTPException(status_code=401, detail="invalid token")


@post_router.post("/delete")
def delete_posts(user: UserModel):
    count = session.query(Posts).filter(Posts.user_id == user.user_id).delete()
    session.commit()
    logging.info("Delete %s posts from user [%s]", count, user.user_id)
    return "delete " + str(count) + " elements"


def check_session(token):
    try:
        decodeJWT(token)
        if session.query(Session).filter_by(token=token).first():
            return True
    except:
        return False
    return False
