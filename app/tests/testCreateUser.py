import unittest
from app.api import create_user, delete, delete_user
from app.db.schemas.users import UserBase, UserLoginSchema
from fastapi import HTTPException
import configparser

class TestUserLogin(unittest.IsolatedAsyncioTestCase):
    
    INI_FILE = "app/tests/config.ini"
    config = configparser.ConfigParser()
    config.sections()
    config.read(INI_FILE)

    valid_user = UserBase(fullname = config['TEST_USER']['FULLNAME'], email = config['TEST_USER']['EMAIL'], password = config['TEST_USER']['PASSWORD'], address = config['TEST_USER']['ADDRESS'])
    
    def test_create_new_user(self):
        expect_exception = {"user successfully created"}
        self.assertTrue(create_user(self.valid_user), expect_exception)

    def test_create_existing_user(self):
        create_user(self.valid_user)
        expect_exception = "user already exists"

        with self.assertRaises(HTTPException) as context:
            create_user(self.valid_user)

        self.assertEqual(context.exception.detail, expect_exception)
       
    def tearDown(self):
        delete_user(self.valid_user.fullname)
        
if __name__ == '__main__':
    unittest.main()

        