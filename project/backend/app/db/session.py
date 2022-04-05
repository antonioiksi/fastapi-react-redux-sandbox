import os

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# from app.core import config

Base = declarative_base()
database_url = os.getenv("DATABASE_URL")
engine = create_engine(database_url)
Session_local = sessionmaker(bind=engine)

session = Session_local()
