from fastapi import APIRouter

from . import route_common, route_user, route_post

tags_metadata = [
    {
        "name": "home",
        "description": "Common api",
    },
    {
        "name": "user",
        "description": "Operations with users: create, login, logout, look posts",
    },
    {
        "name": "post",
        "description": "Manage posts. Add and delete.",
    },
]

api_router = APIRouter()
api_router.include_router(route_common.general_router, tags=["home"])
api_router.include_router(route_user.user_router, tags=["user"])
api_router.include_router(route_post.post_router, tags=["post"])
