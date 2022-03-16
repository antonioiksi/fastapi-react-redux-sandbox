from fastapi import FastAPI, Body, Depends, Request

from app.db.models.posts import Posts
from app.db.models.users import Users
from app.db.schemas.posts import PostBase
from app.db.schemas.users import UserBase, UserLoginSchema, UserModel

from app.auth.auth_bearer import JWTBearer
from app.auth.auth_handler import signJWT
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine, delete
import jwt, bcrypt

from decouple import config
JWT_SECRET = config("secret")
JWT_ALGORITHM = config("algorithm")
JWT_PASSWORD = config("password")

posts = [
    {
        "id": 1,
        "title": "Pancake",
        "content": "Lorem Ipsum ..."
    }
]

Base = declarative_base()
engine = create_engine("postgresql+psycopg2://dimka:12345678@localhost/sqlalchemy_tuts")
Session = sessionmaker(bind=engine)
session = Session()

users = []

app = FastAPI()

@app.get("/", tags=["root"])
async def read_root() -> dict:
    return {"message": "Welcome to your blog!."}

@app.post("/posts", dependencies=[Depends(JWTBearer())], tags=["posts"])
async def add_post(post: PostBase, request: Request) -> dict:
    token = request.headers.get('Authorization').replace("Bearer ", "")

    decoded_token = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
    fullname = decoded_token["user_id"]
    user_id = session.query(Users).filter_by(fullname=fullname).first().id

    new_post = Posts(title=post.title, text=post.text, user_id=user_id)
    session.add(new_post)
    session.commit()
    return {
        "data": "post added by " + fullname,
    }


@app.post("/user/signup", tags=["user"])
async def create_user(user: UserBase = Body(...)):
    # TODO: gensalt возможно заменить на статическую
    pwhash = bcrypt.hashpw(user.password.encode('utf8'), bcrypt.gensalt())
    password_hash = pwhash.decode('utf8')

    new_user = Users(fullname=user.fullname, email=user.email, password = password_hash)
    session.add(new_user)
    session.commit()
    return signJWT(user.fullname)

@app.post("/user/login", tags=["user"])
async def user_login(user: UserLoginSchema = Body(...)):
    user_data = session.query(Users).filter_by(fullname=user.fullname).first()
    if user_data:
        db_pass = user_data.password.encode('utf-8')

        if bcrypt.checkpw(user.password.encode('utf-8'), db_pass):
            return signJWT(user.fullname)
        return {
            "error" : "wrong password"
        }
    return {
        "error": "User does not exist"
    }

@app.post("/update")
def update_token(token : str = Body(...)):
    decoded_token = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
    username = decoded_token["user_id"]

@app.post("/delete")
async def delete_posts(user: UserModel):
    a = session.query(Posts).filter(Posts.user_id == user.user_id).delete()
    session.commit()
    return "delete " + str(a) + " elements"

@app.get("/user/{id}/posts", tags=["posts"])
async def get_single_post(id: int):
    posts = session.query(Posts).filter_by(user_id=id).all()
    return posts

    # print(bcrypt.hashpw(b'password', b'$2b$12$9cBs.G4pe7jC1fGFgNGIau'))