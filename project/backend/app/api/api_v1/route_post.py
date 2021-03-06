from fastapi import Depends, Request, HTTPException, APIRouter
from app.db.models.posts import Posts
from app.core.auth.auth_bearer import JWTBearer
from app.db.schemas.posts import PostBase, GetPosts, PostChange, PostDelete
from app.db.schemas.users import UserModel
from app.core.config import JWT_SECRET, JWT_ALGORITHM
from app.db.session import session
import logging, jwt

from .route_common import check_session


post_router = APIRouter()


@post_router.post("/add_posts", dependencies=[Depends(JWTBearer())])
def add_post(post: PostBase, request: Request) -> dict:
    token = request.headers.get("Authorization").replace("Bearer ", "")
    if check_session(token):
        decoded_token = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        user_id = decoded_token["user_id"]

        new_post = Posts(
            title=post.title,
            text=post.text,
            user_id=user_id,
            create_date=post.create_date,
        )
        session.add(new_post)
        session.commit()
        logging.info("Add new post from user [%s]" % (user_id))
        return {"data": "post added"}
    logging.error("Get invalid token")
    raise HTTPException(status_code=401, detail="invalid token")


@post_router.post("/user_delete")
def delete_user_posts(user: UserModel):
    count = session.query(Posts).filter(Posts.user_id == user.user_id).delete()
    session.commit()
    logging.info("Delete %s posts from user [%s]", count, user.user_id)
    return "delete " + str(count) + " elements"


@post_router.post("/delete")
def delete_posts(data: PostDelete):
    session.query(Posts).filter(Posts.id == data.id).delete()
    session.commit()
    logging.info("Delete posts")
    return "delete posts"


@post_router.post("/change")
def update_posts(data: PostChange):
    post = session.query(Posts).filter(Posts.id == data.id).first()

    post.title = data.title
    post.text = data.text
    post.create_date = data.create_date

    session.commit()

    logging.info("Update post[%s]", data.id)
    return "Done! Post update."


@post_router.get("/post_count")
def post_count():
    return session.query(Posts).count()


@post_router.post("/posts")
def get_user_posts(data: GetPosts):
    sort_by = data.sortby
    offset = data.offset
    limit = data.limit

    posts = session.query(Posts).order_by(sort_by).offset(offset).limit(limit).all()
    logging.info("Get posts!")
    return posts
