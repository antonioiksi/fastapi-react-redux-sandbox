from fastapi import Body, Depends, Request, HTTPException, APIRouter
import os

from app.models.posts import Posts, Session
from app.models.users import Users
from app.schemas.users import UserBase, UserLoginSchema

from app.auth.auth_bearer import JWTBearer
from app.auth.auth_handler import signJWT
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine, delete
from sqlalchemy.orm import sessionmaker

import logging, jwt, bcrypt

from decouple import config
import logging, jwt, bcrypt

JWT_SECRET = config("secret")
JWT_ALGORITHM = config("algorithm")

user_router = APIRouter()

Base = declarative_base()
# engine = create_engine("postgresql+psycopg2://dimka:12345678@localhost/sqlalchemy_tuts")
database_url = os.getenv("DATABASE_URL")
engine = create_engine(database_url)
Session_local = sessionmaker(bind=engine)
session = Session_local()


@user_router.post("/user/signup")
def create_user(user: UserBase = Body(...)):
    # TODO: gensalt возможно заменить на статическую
    user_data = session.query(Users).filter_by(fullname=user.fullname).first()

    if not user_data:
        pwhash = bcrypt.hashpw(user.password.encode("utf8"), bcrypt.gensalt())
        password_hash = pwhash.decode("utf8")

        new_user = Users(
            fullname=user.fullname, email=user.email, password=password_hash
        )
        session.add(new_user)
        session.commit()
        logging.info("User [%s] added successfully", user.fullname)
        return {"user successfully created"}

    logging.error("User not added. Name %s alredy exist", user.fullname)
    raise HTTPException(status_code=409, detail="user already exists")


@user_router.post("/user/login", status_code=200)
def user_login(user: UserLoginSchema = Body(...)):
    """authorisation users"""
    user_data = session.query(Users).filter_by(fullname=user.fullname).first()

    if user_data:
        db_pass = user_data.password.encode("utf-8")

        if bcrypt.checkpw(user.password.encode("utf-8"), db_pass):

            token = signJWT(user_data.id)["access_token"]
            out = ""

            try:
                row = session.query(Session).filter_by(user_id=user_data.id).first()
                row.token = token.decode("utf8")
                logging.info("Replace existing token for user [%s]", user.fullname)
            except:
                new_session = Session(user_id=user_data.id, token=token.decode("utf8"))
                session.add(new_session)
                logging.info("Create new token for user [%s]", user.fullname)

            session.commit()
            # print(out)
            return {"token": token}
        logging.error("Wrong password")
        raise HTTPException(status_code=404, detail="wrong password")

    logging.error("User [%s] does not exist", user.fullname)
    raise HTTPException(status_code=404, detail="user does not exist")


@user_router.get("/user/{id}/posts")
def get_user_posts(id: int):
    posts = session.query(Posts).filter_by(user_id=id).all()
    logging.info("Get posts from user [%s]", id)
    return posts


@user_router.get("/logout", dependencies=[Depends(JWTBearer())])
def logout(request: Request):
    token = request.headers.get("Authorization").replace("Bearer ", "")
    decoded_token = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
    user_id = decoded_token["user_id"]

    try:
        row = session.query(Session).filter_by(user_id=user_id).first()
        session.delete(row)
        session.commit()
        logging.info("User [%s] successfuly logout", user_id)
        return {"Successful logout"}
    except:
        logging.error("Session for user [%s] does not found", user_id)
        raise HTTPException(status_code=404, detail="session does not found")


# @user_router.get("/delete", dependencies=[Depends(JWTBearer())], tags=["user"])
def delete_user(fullname):
    if session.query(Users).filter_by(fullname=fullname).first():
        session.delete(session.query(Users).filter_by(fullname=fullname).first())
        session.commit()

        logging.info("User [%s] successfuly delete", fullname)
        return {"successful delete"}

    logging.error("User [%s] does not found", fullname)
    raise HTTPException(status_code=404, detail="user does not found")
