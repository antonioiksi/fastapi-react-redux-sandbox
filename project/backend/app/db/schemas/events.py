from pydantic import BaseModel
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class EventBase(BaseModel):
    text: str
    date: str

    class Config:
        schema_extra = {
            "example": {
                "text": "new event",
                "date": "08-14-2022",
            }
        }


class DeleteEventsByUser(BaseModel):
    user_id: str

    class Config:
        schema_extra = {
            "example": {
                "user_id": "1",
            }
        }


class GetEvents(BaseModel):
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
