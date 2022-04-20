from app.api.api_v1.route_post import add_post, delete_user_posts
from app.api.api_v1.route_user import user_login, create_user, delete_user, logout
from app.db.session import session
from app.db.models.posts import Session
from app.db.models.users import Users
from app.db.schemas.users import UserBase, UserLoginSchema, UserModel
from app.db.schemas.posts import PostBase
from fastapi import HTTPException, Request
from starlette.datastructures import Headers

import unittest
import configparser
from datetime import datetime


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


class TestAddPost(unittest.IsolatedAsyncioTestCase):

    INI_FILE = "app/tests/config.ini"
    config = configparser.ConfigParser()
    config.sections()
    config.read(INI_FILE)

    valid_user = UserBase(
        fullname=config["TEST_USER"]["FULLNAME"],
        email=config["TEST_USER"]["EMAIL"],
        password=config["TEST_USER"]["PASSWORD"],
        address=config["TEST_USER"]["ADDRESS"],
    )
    valid_post = PostBase(
        title=config["TEST_POST"]["TITLE"],
        text=config["TEST_POST"]["TEXT"],
        create_date=config["TEST_POST"]["CREATE_DATE"]
        # create_date=datetime.strptime(config["TEST_POST"]["CREATE_DATE"], "%y-%m-%d"),
    )
    valid_token = ""

    def build_request(
        token="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHBpcmVzIjoxNjQ3OTU4MDkxLjY3Nzk0MTN9.1VBbttLYaVQdODvr7Q1F5I3DVQCQukiSTFAQDd3HlkA",
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

    def test_add_post(self):
        expect_responce = {"data": "post added"}

        create_user(self.valid_user)

        result = user_login(
            UserLoginSchema(
                fullname=self.config["TEST_USER"]["FULLNAME"],
                password=self.config["TEST_USER"]["PASSWORD"],
            )
        )
        self.valid_token = result["token"].decode("utf8")

        result = add_post(self.valid_post, build_request(token=self.valid_token))

        self.assertEqual(expect_responce, result)

    def test_bad_session(self):
        expect_exception = "invalid token"

        with self.assertRaises(HTTPException) as context:
            add_post(self.valid_post, build_request())

        self.assertTrue(expect_exception in context.exception.detail)

    def tearDown(self):
        user_data = (
            session.query(Users)
            .filter_by(fullname=self.config["TEST_USER"]["FULLNAME"])
            .first()
        )
        if user_data:
            user = UserModel(user_id=user_data.id)
            delete_user_posts(user)

            user_data = session.query(Session).filter_by(user_id=user_data.id).first()
            if user_data:
                logout(build_request(token=user_data.token))

            delete_user(self.valid_user.fullname)


if __name__ == "__main__":
    unittest.main()
