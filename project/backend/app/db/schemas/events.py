from pydantic import BaseModel
from sqlalchemy.ext.declarative import declarative_base
from datetime import date

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
