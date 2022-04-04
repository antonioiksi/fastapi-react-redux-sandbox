from fastapi import APIRouter

from app.apis.api_v1 import route_general_pages, route_user, route_post

api_router = APIRouter()
api_router.include_router(route_general_pages.general_router, tags=["home"])
api_router.include_router(route_user.user_router, tags=["user"])
api_router.include_router(route_post.post_router, tags=["post"])
