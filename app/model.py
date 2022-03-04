from pydantic import BaseModel, Field, EmailStr
from csv import register_dialect
from sqlalchemy import Column, DateTime, String, Integer, func  
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Users(Base):  
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    fullname = Column(String, unique=True)
    email = Column(String)
    password = Column(String)

class UserSchema(BaseModel):
    fullname: str = Field(...)
    email: EmailStr = Field(...)
    password: str = Field(...)

class Posts(Base):  
    __tablename__ = 'posts'
    id = Column(Integer, primary_key=True)
    title = Column(String)
    text = Column(String)
    create_date = Column(DateTime)

class PostSchema(BaseModel):
    id: int = Field(default=None)
    title: str = Field(...)
    text: str = Field(...)
    create_date: str = Field(...)

class UserLoginSchema(BaseModel):
    email: EmailStr = Field(...)
    password: str = Field(...)

    class Config:
        schema_extra = {
            "example": {
                "email": "abdulazeez@x.com",
                "password": "weakpassword"
            }
        }