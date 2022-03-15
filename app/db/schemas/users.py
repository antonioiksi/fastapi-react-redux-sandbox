from pydantic import BaseModel
from sqlalchemy.ext.declarative import declarative_base
Base = declarative_base()

class UserBase(BaseModel):
    fullname: str
    email: str
    password: str
    address: str

    class Config:
        schema_extra = {
            "example": {
                "fullname": "Dimka Di",
                "email": "dimka@dim.a",
                "password": "dima-pass",
                "address": "dima"
            }
        }

class UserLoginSchema(BaseModel):
    fullname: str
    password: str
    
    class Config:
        schema_extra = {
            "example": {
                "fullname": "Dimka Di",
                "password": "dima-pass",
            }
        }