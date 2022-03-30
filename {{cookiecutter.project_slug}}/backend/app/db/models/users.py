from sqlalchemy import Column, Integer, String, ForeignKey, Boolean
from pydantic import BaseModel
from sqlalchemy.ext.declarative import declarative_base
Base = declarative_base()

class Users(Base):  
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    fullname = Column(String, unique=True)
    email = Column(String)
    password = Column(String)
    address = Column(String)