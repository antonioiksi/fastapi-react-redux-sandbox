from sqlalchemy import Column, Integer, String
from ..session import Base


class Users(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    fullname = Column(String, unique=True)
    email = Column(String)
    password = Column(String)
    address = Column(String)
