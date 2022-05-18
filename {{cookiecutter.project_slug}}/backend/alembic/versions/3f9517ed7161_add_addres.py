"""Add addres

Revision ID: 3f9517ed7161
Revises: 265402cbfeb8
Create Date: 2022-03-15 12:35:26.559132

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '3f9517ed7161'
down_revision = '265402cbfeb8'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('address', sa.String(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('users', 'address')
    # ### end Alembic commands ###
