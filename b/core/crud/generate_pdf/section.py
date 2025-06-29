from asyncio import to_thread
from typing import Optional
from fastapi import HTTPException
from fastapi.responses import FileResponse
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload, selectinload
from weasyprint import HTML


from core.crud.generate_pdf.content_collection import render_content_item
from core.models.collection_content import CollectionContent
from core.models.division import Division
from core.models.form_submissions import FormSubmission
from core.models.section import Section
from utils.html_generate_form_elements import _wrap_html

async def generate_section_pdf(section_id: int, session: AsyncSession) -> FileResponse:
   result = await session.execute(
      select(Section)

         .options(            
            selectinload(Section.divisions)
               .selectinload(Division.content_items)
               .joinedload(CollectionContent.submission)
               .joinedload(FormSubmission.form),

            selectinload(Section.divisions)
               .selectinload(Division.content_items)
               .joinedload(CollectionContent.division)
               .joinedload(Division.form) )

         .where(Section.id == section_id))
   section = result.unique().scalar_one_or_none()

   if not section:
      raise HTTPException(status_code=404, detail="Section not found")

   section_html = render_section(section)
   if not section_html:
      raise HTTPException(status_code=404, detail="No selected content found in section")

   combined_html = _wrap_html([section_html])
   pdf_file = f"section_{section_id}.pdf"
   await to_thread(HTML(string=combined_html).write_pdf, pdf_file)
   return FileResponse(pdf_file, media_type="application/pdf", filename=pdf_file)


def render_section(section: Section) -> Optional[str]:
   html_parts = []
   for division in section.divisions:
      for content_item in division.content_items:
         if content_item.is_selected and content_item.submission and content_item.submission.approved:
               content_html =  render_content_item(content_item)
               if content_html:
                  html_parts.append(content_html)
   return ''.join(html_parts) if html_parts else None