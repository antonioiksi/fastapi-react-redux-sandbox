from app.api.api_v1.route_user import user_login, create_user, delete_user, logout
from app.db.session import session
from app.db.models.session import Session
from app.db.models.users import Users
from app.db.schemas.users import UserLoginSchema, UserBase
from fastapi import HTTPException, Request
from starlette.requests import Request
from starlette.datastructures import Headers

import unittest
import configparser


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


class TestUserLogout(unittest.IsolatedAsyncioTestCase):
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

    def setUp(self):
        create_user(self.valid_user)
        self.result = user_login(
            UserLoginSchema(
                fullname=self.valid_user.fullname, password=self.valid_user.password
            )
        )

    def test_common_logout(self):
        self.valid_token = self.result["token"].decode("utf8")

        expect_responce = {"Successful logout"}
        self.assertEqual(expect_responce, logout(build_request(token=self.valid_token)))

    def test_logout_without_session(self):
        self.valid_token = self.result["token"].decode("utf8")
        expect_exception = "session does not found"

        logout(build_request(token=self.valid_token))

        with self.assertRaises(HTTPException) as context:
            logout(build_request(token=self.valid_token))

        self.assertTrue(expect_exception in context.exception.detail)

    def test_bad_token(self):
        self.invalid_token = "123"
        expect_exception = "Not enough segments"

        with self.assertRaises(Exception) as context:
            logout(build_request(token=self.invalid_token))

        self.assertEqual(str(context.exception), expect_exception)

    def tearDown(self):
        user_id = (
            session.query(Users)
            .filter_by(fullname=self.config["TEST_USER"]["FULLNAME"])
            .first()
            .id
        )

        user_data = session.query(Session).filter_by(user_id=user_id).first()
        if user_data:
            logout(build_request(token=user_data.token))

        delete_user(self.valid_user.fullname)


if __name__ == "__main__":
    unittest.main()
