from fastapi.testclient import TestClient

from app.api import app

client = TestClient(app)

def test_read_main():
    response = client.get("/user/login", body = {
    "fullname": "Dimka Di",
    "password": "dima-pass"
    }
    )
    assert response.status_code == 200
    # assert response.json() == {"msg": "Hello World"}