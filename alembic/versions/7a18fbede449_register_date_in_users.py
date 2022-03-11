"""register date in users

Revision ID: 7a18fbede449
Revises: 49716c167205
Create Date: 2022-03-04 11:53:16.426150

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7a18fbede449'
down_revision = '49716c167205'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('posts', sa.Column('title', sa.String(), nullable=True))
    op.add_column('posts', sa.Column('text', sa.String(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('posts', 'text')
    op.drop_column('posts', 'title')
    # ### end Alembic commands ###