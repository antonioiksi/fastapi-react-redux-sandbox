import os

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

database_url = os.getenv("DATABASE_URL")
# postgresql://postgres:password@postgres:5432/app

engine = create_engine(database_url)
Session_local = sessionmaker(bind=engine)

Base = declarative_base()
session = Session_local()
