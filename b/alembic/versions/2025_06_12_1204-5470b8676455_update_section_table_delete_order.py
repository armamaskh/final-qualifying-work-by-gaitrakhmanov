"""update section table: delete order

Revision ID: 5470b8676455
Revises: 3e0338e78bd6
Create Date: 2025-06-12 12:04:05.733537

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = "5470b8676455"
down_revision: Union[str, None] = "3e0338e78bd6"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.drop_column("sections", "order")


def downgrade() -> None:
    op.add_column(
        "sections",
        sa.Column(
            "order",
            sa.INTEGER(),
            server_default=sa.text("0"),
            autoincrement=False,
            nullable=False,
        ),
    )
