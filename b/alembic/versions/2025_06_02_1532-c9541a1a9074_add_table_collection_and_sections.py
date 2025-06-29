"""add table collection and sections

Revision ID: c9541a1a9074
Revises: 1827e750d459
Create Date: 2025-06-02 15:32:28.980172

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = "c9541a1a9074"
down_revision: Union[str, None] = "1827e750d459"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "collections",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("name", sa.String(), nullable=False),
        sa.Column(
            "description",
            sa.String(length=1000),
            server_default="",
            nullable=False,
        ),
        sa.Column(
            "created_at",
            sa.DateTime(),
            server_default=sa.text("TIMEZONE('utc', now())"),
            nullable=False,
        ),
        sa.PrimaryKeyConstraint("id", name=op.f("pk_collections")),
    )
    op.create_table(
        "sections",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("section_type", sa.String(), nullable=False),
        sa.Column("collection_id", sa.Integer(), nullable=False),
        sa.Column("form_id", sa.Integer(), nullable=False),
        sa.Column("submission_id", sa.Integer(), nullable=True),
        sa.Column(
            "created_at",
            sa.DateTime(),
            server_default=sa.text("TIMEZONE('utc', now())"),
            nullable=False,
        ),
        sa.ForeignKeyConstraint(
            ["collection_id"],
            ["collections.id"],
            name=op.f("fk_sections_collection_id_collections"),
        ),
        sa.ForeignKeyConstraint(
            ["form_id"], ["forms.id"], name=op.f("fk_sections_form_id_forms")
        ),
        sa.ForeignKeyConstraint(
            ["submission_id"],
            ["form_submissions.id"],
            name=op.f("fk_sections_submission_id_form_submissions"),
        ),
        sa.PrimaryKeyConstraint("id", name=op.f("pk_sections")),
    )
    op.add_column(
        "form_submissions",
        sa.Column(
            "approved",
            sa.Boolean(),
            server_default=sa.text("False"),
            nullable=False,
        ),
    )
    op.alter_column(
        "forms",
        "description",
        existing_type=sa.VARCHAR(length=300),
        type_=sa.String(length=500),
        existing_nullable=False,
        existing_server_default=sa.text("''::character varying"),
    )


def downgrade() -> None:
    op.alter_column(
        "forms",
        "description",
        existing_type=sa.String(length=500),
        type_=sa.VARCHAR(length=300),
        existing_nullable=False,
        existing_server_default=sa.text("''::character varying"),
    )
    op.drop_column("form_submissions", "approved")
    op.drop_table("sections")
    op.drop_table("collections")
    # ### end Alembic commands ###
