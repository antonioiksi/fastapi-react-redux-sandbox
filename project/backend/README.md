### To add a new table, add its model in the folderapp/db/models. 
### Next you need to generate the migration:
```ssh
alembic revision --autogenerate -m "Migration name"
```
### And run it:
```ssh
alembic upgrade head
```