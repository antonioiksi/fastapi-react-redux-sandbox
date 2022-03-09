from fastapi import FastAPI, Body, Depends

from app.model import PostSchema, UserSchema, UserLoginSchema, Users, Posts
from app.auth.auth_bearer import JWTBearer
from app.auth.auth_handler import signJWT
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
import jwt

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
async def add_post(post: PostSchema) -> dict:
    # post.id = len(posts) + 1
    # posts.append(post.dict())
    new_post = Posts(title=post.title, text=post.text, create_date = post.create_date)
    session.add(new_post)
    session.commit()
    return {
        "data": "post added."
    }

@app.get("/posts/{id}", tags=["posts"])
async def get_single_post(id: int) -> dict:
    if id > len(posts):
        return {
            "error": "No such post with the supplied ID."
        }

    for post in posts:
        if post["id"] == id:
            return {
                "data": post
            }

@app.post("/user/signup", tags=["user"])
async def create_user(user: UserSchema = Body(...)):
    new_user = Users(fullname=user.fullname, email=user.email, password = user.password)
    session.add(new_user)
    session.commit()
    return signJWT(user.email)

def check_user(data: UserLoginSchema):
    for user in users:
        if user.email == data.email and user.password == data.password:
            return True
    return False

@app.post("/user/login", tags=["user"])
async def user_login(user: UserLoginSchema = Body(...)):
    if check_user(user):
        return signJWT(user.email)
    return {
        "error": "Wrong login details!"
    }

from decouple import config
JWT_SECRET = config("secret")
JWT_ALGORITHM = config("algorithm")

@app.post("/update")
def update_token(token : str = Body(...)):
    decoded_token = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
    username = decoded_token["user_id"]
    return signJWT(username)