"""update sections table: add user_id

Revision ID: 355451e7666b
Revises: c9541a1a9074
Create Date: 2025-06-02 20:40:47.701410

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = "355451e7666b"
down_revision: Union[str, None] = "c9541a1a9074"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column(
        "sections", sa.Column("user_id", sa.Integer(), nullable=False)
    )
    op.create_foreign_key(
        op.f("fk_sections_user_id_users"),
        "sections",
        "users",
        ["user_id"],
        ["id"],
    )


def downgrade() -> None:
    op.drop_constraint(
        op.f("fk_sections_user_id_users"), "sections", type_="foreignkey"
    )
    op.drop_column("sections", "user_id")
