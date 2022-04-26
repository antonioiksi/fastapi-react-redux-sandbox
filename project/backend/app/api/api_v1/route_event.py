from fastapi import Depends, Request, HTTPException, APIRouter
from app.db.models.events import Events
from app.core.auth.auth_bearer import JWTBearer
from app.db.schemas.events import EventBase, DeleteEventsByUser, GetEvents
from app.core.config import JWT_SECRET, JWT_ALGORITHM
from app.db.session import session
import logging, jwt
from sqlalchemy import desc

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


@event_router.post("/events")
def get_events(data: GetEvents):
    sort_by = data.sortby
    offset = data.offset
    limit = data.limit

    events = (
        session.query(Events).order_by(desc(sort_by)).offset(offset).limit(limit).all()
    )
    logging.info("Get events!")
    return events


@event_router.post("/events_delete")
def delete_events_byuser(data: DeleteEventsByUser):
    count = session.query(Events).filter(Events.user_id == data.user_id).delete()
    session.commit()
    logging.info("Delete %s events from user [%s]", count, data.user_id)
    return "delete " + str(count) + " elements"


@event_router.get("/events_count")
def post_count():
    return session.query(Events).count()
