from pydantic import BaseModel, Field, EmailStr
from csv import register_dialect
from sqlalchemy import Column, DateTime, String, Integer, func, ForeignKey 
from sqlalchemy.ext.declarative import declarative_base
from pydantic_sqlalchemy import sqlalchemy_to_pydantic