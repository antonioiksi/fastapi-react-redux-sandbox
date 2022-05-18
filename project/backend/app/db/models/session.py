from sqlalchemy import Column, Integer, String, ForeignKey
from ..session import Base


class Session(Base):
    __tablename__ = "session"
    user_id = Column(Integer, ForeignKey("users.id"), primary_key=True)
    token = Column(String)
