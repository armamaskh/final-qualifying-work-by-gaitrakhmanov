"""update users table

Revision ID: b2e56e1966a4
Revises: b122dd6f59b3
Create Date: 2025-05-07 10:47:36.951789

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = "b2e56e1966a4"
down_revision: Union[str, None] = "b122dd6f59b3"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column(
        "users",
        sa.Column(
            "is_administrator",
            sa.Boolean(),
            server_default="false",
            nullable=False,
        ),
    )


def downgrade() -> None:
    op.drop_column("users", "is_administrator")
