from pydantic import BaseModel, Field, EmailStr
from csv import register_dialect
from sqlalchemy import Column, DateTime, String, Integer, func, ForeignKey 
from sqlalchemy.ext.declarative import declarative_base
from pydantic_sqlalchemy import sqlalchemy_to_pydantic

# Base = declarative_base()

# class Users(Base):  
#     __tablename__ = 'users'
#     id = Column(Integer, primary_key=True)
#     fullname = Column(String, unique=True)
#     email = Column(String)
#     password = Column(String)
#     address = Column(String)

# UserSchema = sqlalchemy_to_pydantic(Users)

# class Posts(Base):  
#     __tablename__ = 'posts'
#     id = Column(Integer, primary_key=True)
#     user_id = Column(Integer, ForeignKey('users.id'))
#     title = Column(String)
#     text = Column(String)
#     create_date = Column(DateTime)

# PostSchema = sqlalchemy_to_pydantic(Posts)

# class UserLoginSchema(BaseModel):
#     email: EmailStr = Field(...)
#     password: str = Field(...)

#     class Config:
#         schema_extra = {
#             "example": {
#                 "email": "abdulazeez@x.com",
#                 "password": "weakpassword"
#             }
#         }