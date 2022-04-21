from app.db.schemas.users import UserBase, UserLoginSchema
from app.api.api_v1.route_user import create_user, user_login
from app.api.api_v1.route_post import add_post
from fastapi import Request
from app.db.schemas.posts import PostBase
from starlette.datastructures import Headers

import configparser
import string
import random
import datetime

INI_FILE = "app/core/config.ini"
config = configparser.ConfigParser()
config.sections()
config.read(INI_FILE)


def build_request(
    token="1",
    body: str = None,
) -> Request:
    request = Request(
        {
            "type": "http",
            "headers": Headers({"authorization": "Bearer " + token}).raw,
        }
    )
    if body:

        async def request_body():
            return body

        request.body = request_body
    return request


def init() -> None:

    try:
        result = user_login(
            UserLoginSchema(
                fullname=config["SUPERUSER"]["SUPERUSER_FULLNAME"],
                password=config["SUPERUSER"]["SUPERUSER_PASSWORD"],
            )
        )

        print("Base INIT ALREADY done")

    except:
        # Create superuser
        create_user(
            UserBase(
                fullname=config["SUPERUSER"]["SUPERUSER_FULLNAME"],
                email=config["SUPERUSER"]["SUPERUSER_EMAIL"],
                password=config["SUPERUSER"]["SUPERUSER_PASSWORD"],
                address=config["SUPERUSER"]["SUPERUSER_ADDRESS"],
            ),
        )
        print("Superuser created")

        # Add posts
        result = user_login(
            UserLoginSchema(
                fullname=config["SUPERUSER"]["SUPERUSER_FULLNAME"],
                password=config["SUPERUSER"]["SUPERUSER_PASSWORD"],
            )
        )

        valid_token = result["token"].decode("utf8")

        letters = string.ascii_letters + "       "

        for i in range(150):
            add_post(
                PostBase(
                    title="".join(random.choice(letters) for i in range(10)),
                    text="".join(random.choice(letters) for i in range(100)),
                    create_date=datetime.date.today(),
                ),
                build_request(token=valid_token),
            )

        print("Init post added")


if __name__ == "__main__":
    init()
