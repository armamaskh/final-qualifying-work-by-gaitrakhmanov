from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from core.crud.generate_pdf.collection import generate_collection_pdf
from core.crud.generate_pdf.content_collection import generate_collection_content_pdf
from core.crud.generate_pdf.division import generate_division_pdf
from core.crud.generate_pdf.section import generate_section_pdf



async def generate_pdf(session: AsyncSession,   collection_id: int = None,
                                                level: str = "collection",

                                                section_id: int = None,
                                                division_id: int = None,
                                                collection_content_id: int = None ):
    if level == "collection":
        return await generate_collection_pdf(collection_id, session)
    elif level == "section":
        if not section_id:
            raise HTTPException(status_code=400, detail="section_id required for section level")
        return await generate_section_pdf(section_id, session)
    elif level == "division":
        if not division_id:
            raise HTTPException(status_code=400, detail="division_id required for division level")
        return await generate_division_pdf(division_id, session)
    elif level == "collection_content":
        if not collection_content_id:
            raise HTTPException(status_code=400, detail="content_id required for content level")
        return await generate_collection_content_pdf(collection_content_id, session)
    else:
        raise HTTPException(status_code=400, detail="Invalid level parameter")
    



# async def generate_pdf(collection_id: int, session: AsyncSession):
#     result = await session.execute(
#         select(Collection)
#             .where(Collection.id == collection_id))
#     collection = result.scalar_one_or_none()

#     if not collection:
#         raise HTTPException(status_code=404, detail="Collection not found")

#     result = await session.execute(
#         select(Section)
#             .options( joinedload(Section.form),
#                       joinedload(Section.form_submission))
#             .where(Section.collection_id == collection_id)  )
#     sections = result.scalars().all()

#     html_sections = []
#     for section in sections:
        
#         if section.section_type.startswith("article"):
#             result = await session.execute(
#                 select(FormSubmission)
#                     .where(
#                         FormSubmission.form_id == section.form_id,
#                         FormSubmission.approved == True )   )
#             article_submissions = result.scalars().all()
            
#             for submission in article_submissions:
#                 section_html = generate_section_html(section.form, submission)
#                 html_sections.append(f'<div style="page-break-before: always;">{section_html}</div>')
#         else:
#             section_html =  generate_section_html(section.form, section.form_submission)
#             html_sections.append(section_html)

#     combined_html = (   '<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body>'
#                         + ''.join(html_sections)
#                         + '</body></html>'  
#                     )

#     pdf_file = f"collection_{collection_id}.pdf"
#     HTML(string=combined_html).write_pdf(pdf_file)
#     return FileResponse(pdf_file, media_type="application/pdf", filename=pdf_file)
