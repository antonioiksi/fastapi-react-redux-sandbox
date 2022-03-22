import unittest
from app.api import logout, user_login
from app.db.schemas.users import UserLoginSchema
from fastapi import HTTPException, Request
from starlette.requests import Request
from starlette.datastructures import Headers

def build_request(
    token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHBpcmVzIjoxNjQ3OTU4MDkxLjY3Nzk0MTN9.1VBbttLYaVQdODvr7Q1F5I3DVQCQukiSTFAQDd3HlkA',
    body: str = None,
) -> Request:
    request = Request(
        {
            "type": "http",
            "headers": Headers({'authorization': 'Bearer ' + token}).raw,
        }
    )
    if body:
        async def request_body():
            return body
        request.body = request_body
    return request

class TestUserLogout(unittest.IsolatedAsyncioTestCase):

    async def test_common_logout(self):
        result = await user_login(UserLoginSchema(fullname = "Dimka Di",password = "dima-pass"))
        self.valid_token = result['token'].decode('utf8')

        expect_responce = {"Successful logout"}
        self.assertEqual(expect_responce, await logout(build_request(token = self.valid_token)))

    async def test_logout_without_session(self):
        result = await user_login(UserLoginSchema(fullname = "Dimka Di",password = "dima-pass"))
        self.valid_token = result['token'].decode('utf8')
        expect_exception = "session does not found"

        await logout(build_request(token = self.valid_token))
        
        with self.assertRaises(HTTPException) as context:
            await logout(build_request(token = self.valid_token))

        self.assertTrue(expect_exception in context.exception.detail)

    async def test_bad_token(self):
        self.invalid_token = "123"
        expect_exception = "Not enough segments"
        
        with self.assertRaises(Exception) as context:
            await logout(build_request(token = self.invalid_token))

        print(str(context.exception))
        self.assertEqual(str(context.exception), expect_exception)

       
if __name__ == '__main__':
    unittest.main()
  