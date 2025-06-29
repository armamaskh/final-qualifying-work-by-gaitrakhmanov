"""create form and form_submissions + update users

Revision ID: 1827e750d459
Revises: b2e56e1966a4
Create Date: 2025-05-17 18:52:48.474062

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

revision: str = "1827e750d459"
down_revision: Union[str, None] = "b2e56e1966a4"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "forms",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("user_id", sa.Integer(), nullable=False),
        sa.Column(
            "created_at",
            sa.DateTime(),
            server_default=sa.text("TIMEZONE('utc', now())"),
            nullable=False,
        ),
        sa.Column(
            "published",
            sa.Boolean(),
            server_default=sa.text("False"),
            nullable=False,
        ),
        sa.Column("name", sa.String(), nullable=False),
        sa.Column(
            "description",
            sa.String(length=300),
            server_default="",
            nullable=False,
        ),
        sa.Column("content", sa.String(), server_default="[]", nullable=False),
        sa.Column(
            "visits", sa.Integer(), server_default=sa.text("0"), nullable=False
        ),
        sa.Column(
            "submissions",
            sa.Integer(),
            server_default=sa.text("0"),
            nullable=False,
        ),
        sa.Column("share_url", sa.String(length=36), nullable=False),
        sa.ForeignKeyConstraint(
            ["user_id"], ["users.id"], name=op.f("fk_forms_user_id_users")
        ),
        sa.PrimaryKeyConstraint("id", name=op.f("pk_forms")),
        sa.UniqueConstraint("share_url", name=op.f("uq_forms_share_url")),
    )
    op.create_table(
        "form_submissions",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column(
            "created_at",
            sa.DateTime(),
            server_default=sa.text("TIMEZONE('utc', now())"),
            nullable=False,
        ),
        sa.Column("form_id", sa.Integer(), nullable=False),
        sa.Column("content", sa.String(), nullable=False),
        sa.ForeignKeyConstraint(
            ["form_id"],
            ["forms.id"],
            name=op.f("fk_form_submissions_form_id_forms"),
        ),
        sa.PrimaryKeyConstraint("id", name=op.f("pk_form_submissions")),
    )


def downgrade() -> None:
    op.drop_table("form_submissions")
    op.drop_table("forms")
