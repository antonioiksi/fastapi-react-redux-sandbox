import unittest
from app.api import user_login, create_user, delete_user, logout, session, Session, Users
from app.db.schemas.users import UserLoginSchema, UserBase
from fastapi import HTTPException, Request
from starlette.datastructures import Headers
import configparser

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

class TestUserLogin(unittest.IsolatedAsyncioTestCase):
  INI_FILE = "app/tests/config.ini"
  config = configparser.ConfigParser()
  config.sections()
  config.read(INI_FILE)

  valid_user = UserBase(fullname = config['TEST_USER']['FULLNAME'], email = config['TEST_USER']['EMAIL'], password = config['TEST_USER']['PASSWORD'], address = config['TEST_USER']['ADDRESS'])

  def setUp(self):
    create_user(self.valid_user)

    self.valid_login = UserLoginSchema(fullname = self.config['TEST_USER']['FULLNAME'],password = self.config['TEST_USER']['PASSWORD'])
    self.invalid_name = UserLoginSchema(fullname = self.config['TEST_USER']['FULLNAME'] + "_wrong",password = self.config['TEST_USER']['PASSWORD'])
    self.invalid_password = UserLoginSchema(fullname = self.config['TEST_USER']['FULLNAME'],password = self.config['TEST_USER']['PASSWORD'] + "_wrong")

  def test_valid_login(self):
    result = user_login(self.valid_login)
    istoken = False

    if result['token']: istoken = True

    self.assertTrue(istoken)

  def test_invalid_name(self):
    expect_exception = "user does not exist"

    with self.assertRaises(HTTPException) as context:
      user_login(self.invalid_name)

    self.assertTrue(expect_exception in context.exception.detail)

  def test_invalid_password(self):
    expect_exception = "wrong password"

    with self.assertRaises(HTTPException) as context:
      user_login(self.invalid_password)

    self.assertTrue(expect_exception in context.exception.detail)
    
  def tearDown(self):
    user_id = session.query(Users).filter_by(fullname=self.config['TEST_USER']['FULLNAME']).first().id

    user_data = session.query(Session).filter_by(user_id=user_id).first()
    if user_data:
      logout(build_request(token = user_data.token))

    delete_user(self.valid_user.fullname)

if __name__ == '__main__':
    unittest.main()
  