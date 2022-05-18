import configparser
import time
from typing import Dict
from app.core.config import JWT_SECRET, JWT_ALGORITHM

import jwt

INI_FILE = "app/core/config.ini"
config = configparser.ConfigParser()
config.sections()
config.read(INI_FILE)


def token_response(token: str):
    return {"access_token": token}


def signJWT(user_id: str) -> Dict[str, str]:
    payload = {
        "user_id": user_id,
        "expire": time.time() + float(config["TIME"]["TIME_EXPIRE"]),
    }
    token = jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

    return token_response(token)


def decodeJWT(token: str) -> dict:
    try:
        decoded_token = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return decoded_token if decoded_token["expire"] >= time.time() else None
    except:
        return {}
