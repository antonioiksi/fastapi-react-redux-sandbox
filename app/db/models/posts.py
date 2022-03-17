from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Boolean
from pydantic import BaseModel
from sqlalchemy.ext.declarative import declarative_base
Base = declarative_base()

class Posts(Base):  
    __tablename__ = 'posts'
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    title = Column(String)
    text = Column(String)
    create_date = Column(DateTime)

class Users(Base):  
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    fullname = Column(String, unique=True)
    email = Column(String)
    password = Column(String)
    address = Column(String)

class Session(Base):  
    __tablename__ = 'session'
    user_id = Column(Integer, ForeignKey('users.id'), primary_key=True)
    token = Column(String)
    