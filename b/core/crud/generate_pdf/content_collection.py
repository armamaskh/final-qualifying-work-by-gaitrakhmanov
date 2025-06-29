from asyncio import to_thread
import os
from typing import Optional
from fastapi import HTTPException
from fastapi.responses import FileResponse
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload
from weasyprint import HTML


from core.models.collection_content import CollectionContent
from core.models.division import Division
from core.models.form_submissions import FormSubmission
from utils.html_generate_form_elements import _wrap_html, generate_element_html

async def generate_collection_content_pdf(content_id: int, session: AsyncSession) -> FileResponse:
   result = await session.execute(
      select(CollectionContent)
         .options(
            joinedload(CollectionContent.division)
                .joinedload(Division.form),
            joinedload(CollectionContent.submission)
                .joinedload(FormSubmission.form)
         )
      .where(CollectionContent.id == content_id) )
   
   content_item = result.unique().scalar_one_or_none()
   if not content_item:
      raise HTTPException(status_code=404, detail="Content item not found")

   if not content_item.is_selected or not content_item.submission or not content_item.submission.approved:
      raise HTTPException(status_code=404, detail="Content item is not selected or approved")
   

   content_html = render_content_item(content_item)
   if not content_html:
      raise HTTPException(status_code=404, detail="No content found for the item")

   combined_html = _wrap_html([content_html])

   # output_folder = "content collections"
   pdf_file = f"content_collection_{content_id}.pdf"
   # os.makedirs(output_folder, exist_ok=True)
   # pdf_file = os.path.join(output_folder, pdf_file)
   
   await to_thread(HTML(string=combined_html).write_pdf, pdf_file)
   return FileResponse(pdf_file, media_type="application/pdf", filename=pdf_file)


def render_content_item(content_item: CollectionContent) -> Optional[str]:
   division = content_item.division
   submission = content_item.submission

   if division.name.lower() == "main" or division.name in ("Основная", "Публикации", "Статьи"):
      if submission and submission.approved:
         form = submission.form
         return generate_element_html(form, submission)
      else:
         return None
      
   form = division.form
   if form:
      return generate_element_html(form, submission)
        
   return None
