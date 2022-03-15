from pydantic import BaseModel
from sqlalchemy.ext.declarative import declarative_base
Base = declarative_base()

class PostBase(BaseModel):
    token: str
    title: str
    text: str
    create_date: str