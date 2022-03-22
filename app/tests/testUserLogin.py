import unittest
from app.api import user_login
from app.db.schemas.users import UserLoginSchema
from fastapi import HTTPException

class TestUserLogin(unittest.IsolatedAsyncioTestCase):

    def setUp(self):
      self.valid_login = UserLoginSchema(fullname = "Dimka Di",password = "dima-pass")

      self.invalid_name = UserLoginSchema(fullname = "NOT Dimka Di",password = "dima-pass")

      self.invalid_password = UserLoginSchema(fullname = "Dimka Di",password = "NOT dima-pass")

    async def test_valid_login(self):
      result = await user_login(self.valid_login)
      istoken = False

      if result['token']: istoken = True

      self.assertTrue(istoken)

    async def test_invalid_name(self):
      expect_exception = "user does not exist"

      with self.assertRaises(HTTPException) as context:
            await user_login(self.invalid_name)
 
      self.assertTrue(expect_exception in context.exception.detail)

    async def test_invalid_password(self):
      expect_exception = "wrong password"

      with self.assertRaises(HTTPException) as context:
            await user_login(self.invalid_password)

      self.assertTrue(expect_exception in context.exception.detail)
       
if __name__ == '__main__':
    unittest.main()
  