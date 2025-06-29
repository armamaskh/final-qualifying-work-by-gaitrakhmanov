from asyncio import to_thread
from fastapi import HTTPException
from fastapi.responses import FileResponse
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload, selectinload
from weasyprint import HTML


from core.crud.generate_pdf.content_collection import render_content_item
from core.models.collection_content import CollectionContent
from core.models.division import Division
from utils.html_generate_form_elements import _wrap_html

async def generate_division_pdf(division_id: int, session: AsyncSession) -> FileResponse:
    result = await session.execute(
        select(Division)
            .options(
                
                joinedload(Division.form),
                
                selectinload(Division.content_items)
                    .joinedload(CollectionContent.submission),
                
                selectinload(Division.content_items)
                    .joinedload(CollectionContent.division)
                    .joinedload(Division.form))
            .where(Division.id == division_id) )
    division = result.unique().scalar_one_or_none()

    if not division:
        raise HTTPException(status_code=404, detail="Division not found")

    division_html = []
    for content_item in division.content_items:
        if content_item.is_selected and content_item.submission and content_item.submission.approved:
            content_html = render_content_item(content_item)
            if content_html:
                division_html.append(f'<div style="page-break-before: always;">{content_html}</div>')

    if not division_html:
        raise HTTPException(status_code=404, detail="No selected content found in division")

    combined_html = _wrap_html(division_html)

    # output_folder = "divisions"
    # os.makedirs(output_folder, exist_ok=True)
    pdf_file = f"division_{division_id}.pdf"
    # pdf_file = os.path.join(output_folder, pdf_file)

    await to_thread(HTML(string=combined_html).write_pdf, pdf_file)
    return FileResponse(pdf_file, media_type="application/pdf", filename=pdf_file)
    
