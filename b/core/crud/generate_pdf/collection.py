from asyncio import to_thread
import os
from fastapi import HTTPException
from fastapi.responses import FileResponse
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload, selectinload
from weasyprint import HTML


from core.crud.generate_pdf.section import render_section
from core.models.collection import Collection
from core.models.collection_content import CollectionContent
from core.models.division import Division
from core.models.form_submissions import FormSubmission
from core.models.section import Section
from utils.html_generate_form_elements import _wrap_html

async def generate_collection_pdf(collection_id: int, 
                                  session: AsyncSession) -> FileResponse:
   result = await session.execute(
      select(Collection)
         .where(Collection.id == collection_id) )
   collection = result.scalar_one_or_none()

   if not collection:
      raise HTTPException(status_code=404, detail="Collection not found")

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
                .joinedload(Division.form))

         .where(Section.collection_id == collection_id) )
   
   sections = result.unique().scalars().all()

   html_sections = []
   for section in sections:
      section_html = render_section(section)
      if section_html:
         html_sections.append(f'<div style="page-break-before: always;">{section_html}</div>')
         # html_sections.append(section_html)

   if not html_sections:
      raise HTTPException(status_code=404, detail="No selected content found in collection")

   combined_html = _wrap_html(html_sections)

   # output_folder = "collections"
   # os.makedirs(output_folder, exist_ok=True)
   pdf_file = f"collection_{collection_id}.pdf"
   # pdf_file = os.path.join(output_folder, pdf_file)

   await to_thread(HTML(string=combined_html).write_pdf, pdf_file)
   return FileResponse(pdf_file, media_type="application/pdf", filename=pdf_file)
