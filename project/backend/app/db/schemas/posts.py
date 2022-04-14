from pydantic import BaseModel
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class PostBase(BaseModel):
    title: str
    text: str
    create_date: str


class GetPosts(BaseModel):
    limit: str
    offset: str
    sortby: str

    class Config:
        schema_extra = {
            "example": {
                "limit": "10",
                "offset": "5",
                "sortby": "title",
            }
        }
