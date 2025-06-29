"""add division, collection_content tables and update section form_submission

Revision ID: 76fecbc21508
Revises: 355451e7666b
Create Date: 2025-06-08 21:38:45.407903

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

revision: str = "76fecbc21508"
down_revision: Union[str, None] = "355451e7666b"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "divisions",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("name", sa.String(), nullable=False),
        sa.Column(
            "order", sa.Integer(), server_default=sa.text("0"), nullable=False
        ),
        sa.Column("section_id", sa.Integer(), nullable=False),
        sa.Column("form_id", sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(
            ["form_id"], ["forms.id"], name=op.f("fk_divisions_form_id_forms")
        ),
        sa.ForeignKeyConstraint(
            ["section_id"],
            ["sections.id"],
            name=op.f("fk_divisions_section_id_sections"),
        ),
        sa.PrimaryKeyConstraint("id", name=op.f("pk_divisions")),
    )
    op.create_table(
        "collection_contents",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column(
            "order", sa.Integer(), server_default=sa.text("0"), nullable=False
        ),
        sa.Column("division_id", sa.Integer(), nullable=False),
        sa.Column("submission_id", sa.Integer(), nullable=False),
        sa.Column(
            "created_at",
            sa.DateTime(),
            server_default=sa.text("TIMEZONE('utc', now())"),
            nullable=False,
        ),
        sa.ForeignKeyConstraint(
            ["division_id"],
            ["divisions.id"],
            name=op.f("fk_collection_contents_division_id_divisions"),
        ),
        sa.ForeignKeyConstraint(
            ["submission_id"],
            ["form_submissions.id"],
            name=op.f("fk_collection_contents_submission_id_form_submissions"),
        ),
        sa.PrimaryKeyConstraint("id", name=op.f("pk_collection_contents")),
    )
    op.add_column(
        "form_submissions", sa.Column("user_id", sa.Integer(), nullable=False)
    )
    op.create_foreign_key(
        op.f("fk_form_submissions_user_id_users"),
        "form_submissions",
        "users",
        ["user_id"],
        ["id"],
    )
    op.add_column("sections", sa.Column("name", sa.String(), nullable=False))
    op.add_column(
        "sections",
        sa.Column(
            "order", sa.Integer(), server_default=sa.text("0"), nullable=False
        ),
    )
    op.drop_constraint(
        "fk_sections_form_id_forms", "sections", type_="foreignkey"
    )
    op.drop_constraint(
        "fk_sections_user_id_users", "sections", type_="foreignkey"
    )
    op.drop_constraint(
        "fk_sections_submission_id_form_submissions",
        "sections",
        type_="foreignkey",
    )
    op.drop_column("sections", "form_id")
    op.drop_column("sections", "submission_id")
    op.drop_column("sections", "created_at")
    op.drop_column("sections", "user_id")


def downgrade() -> None:
    op.add_column(
        "sections",
        sa.Column(
            "user_id", sa.INTEGER(), autoincrement=False, nullable=False
        ),
    )
    op.add_column(
        "sections",
        sa.Column(
            "created_at",
            postgresql.TIMESTAMP(),
            server_default=sa.text("timezone('utc'::text, now())"),
            autoincrement=False,
            nullable=False,
        ),
    )
    op.add_column(
        "sections",
        sa.Column(
            "submission_id", sa.INTEGER(), autoincrement=False, nullable=True
        ),
    )
    op.add_column(
        "sections",
        sa.Column(
            "form_id", sa.INTEGER(), autoincrement=False, nullable=False
        ),
    )
    op.create_foreign_key(
        "fk_sections_submission_id_form_submissions",
        "sections",
        "form_submissions",
        ["submission_id"],
        ["id"],
    )
    op.create_foreign_key(
        "fk_sections_user_id_users", "sections", "users", ["user_id"], ["id"]
    )
    op.create_foreign_key(
        "fk_sections_form_id_forms", "sections", "forms", ["form_id"], ["id"]
    )
    op.drop_column("sections", "order")
    op.drop_column("sections", "name")
    op.drop_constraint(
        op.f("fk_form_submissions_user_id_users"),
        "form_submissions",
        type_="foreignkey",
    )
    op.drop_column("form_submissions", "user_id")
    op.drop_table("collection_contents")
    op.drop_table("divisions")
