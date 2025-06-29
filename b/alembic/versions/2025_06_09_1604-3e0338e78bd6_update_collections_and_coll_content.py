"""update collections and coll_content

Revision ID: 3e0338e78bd6
Revises: 76fecbc21508
Create Date: 2025-06-09 16:04:50.454979

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = "3e0338e78bd6"
down_revision: Union[str, None] = "76fecbc21508"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column(
        "collection_contents",
        sa.Column(
            "is_selected",
            sa.Boolean(),
            server_default=sa.text("False"),
            nullable=False,
        ),
    )
    op.add_column(
        "collections",
        sa.Column("cover", sa.String(), server_default="", nullable=False),
    )
    op.add_column(
        "collections",
        sa.Column("authors", sa.String(), server_default="", nullable=True),
    )
    op.add_column(
        "collections",
        sa.Column(
            "publisher",
            sa.String(length=300),
            server_default="",
            nullable=True,
        ),
    )
    op.add_column(
        "collections",
        sa.Column(
            "published",
            sa.Boolean(),
            server_default=sa.text("False"),
            nullable=False,
        ),
    )
    op.add_column(
        "collections",
        sa.Column(
            "adoption_state",
            sa.Boolean(),
            server_default=sa.text("False"),
            nullable=False,
        ),
    )


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_column("collections", "adoption_state")
    op.drop_column("collections", "published")
    op.drop_column("collections", "publisher")
    op.drop_column("collections", "authors")
    op.drop_column("collections", "cover")
    op.drop_column("collection_contents", "is_selected")
