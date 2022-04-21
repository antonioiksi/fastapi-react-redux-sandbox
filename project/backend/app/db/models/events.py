from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from ..session import Base


class Events(Base):
    __tablename__ = "events"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    text = Column(String)
    date = Column(DateTime)
