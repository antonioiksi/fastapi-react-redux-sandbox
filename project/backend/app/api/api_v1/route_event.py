from fastapi import Depends, Request, HTTPException, APIRouter
from app.db.models.events import Events
from app.core.auth.auth_bearer import JWTBearer
from app.db.schemas.events import EventBase, DeleteEventsByUser
from app.core.config import JWT_SECRET, JWT_ALGORITHM
from app.db.session import session
import logging, jwt

from datetime import datetime
from .route_common import check_session


event_router = APIRouter()


@event_router.post("/add_event", dependencies=[Depends(JWTBearer())])
def add_event(data: EventBase, request: Request) -> dict:
    token = request.headers.get("Authorization").replace("Bearer ", "")
    if check_session(token):
        decoded_token = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        user_id = decoded_token["user_id"]

        new_event = Events(
            user_id=user_id,
            text=data.text,
            date=data.date,
        )
        session.add(new_event)
        session.commit()
        logging.info("Add new event from user [%s]" % (user_id))
        return {"data": "event added"}
    logging.error("Get invalid token")
    raise HTTPException(status_code=401, detail="invalid token")


@event_router.get("/events")
def get_events():
    posts = session.query(Events).all()
    logging.info("Get posts!")
    return posts


@event_router.post("/events_delete")
def delete_events_byuser(data: DeleteEventsByUser):
    count = session.query(Events).filter(Events.user_id == data.user_id).delete()
    session.commit()
    logging.info("Delete %s events from user [%s]", count, data.user_id)
    return "delete " + str(count) + " elements"
