from datetime import date
from pydantic import BaseModel
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

# TODO: возможно можно сократить количество схем


class PostBase(BaseModel):
    title: str
    text: str
    create_date: date


class PostDelete(BaseModel):
    id: str


class PostChange(BaseModel):
    id: str
    title: str
    text: str
    create_date: date


class GetPosts(BaseModel):
    limit: str
    offset: str
    sortby: str

    class Config:
        schema_extra = {
            "example": {
                "limit": "10",
                "offset": "0",
                "sortby": "id",
            }
        }
