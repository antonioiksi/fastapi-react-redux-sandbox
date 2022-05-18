from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from ..session import Base


class Posts(Base):
    __tablename__ = "posts"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    title = Column(String)
    text = Column(String)
    create_date = Column(DateTime)
