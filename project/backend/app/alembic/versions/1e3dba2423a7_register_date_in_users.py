"""register date in users

Revision ID: 1e3dba2423a7
Revises: 7a18fbede449
Create Date: 2022-03-04 11:55:11.054511

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '1e3dba2423a7'
down_revision = '7a18fbede449'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('posts', sa.Column('create_date', sa.DateTime(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('posts', 'create_date')
    # ### end Alembic commands ###
