from fastapi import HTTPException
from sqlalchemy import Result, func, insert, select, update
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from core.models.collection_content import CollectionContent
from core.models.division import Division
from core.models.form import Form
from core.models.form_submissions import FormSubmission
from core.models.section import Section
from core.models.user import User
from core.schemas.form import ArticleCreate, FormCreate, FormSubmissionUpdate, FormUpdate, FormUpdatePartial

async def get_forms(session: AsyncSession) -> list[Form]:
   stmt = select(Form).order_by(Form.id)
   result: Result = await session.execute(stmt)
   forms = result.scalars().all()
   return list(forms)

async def get_form_by_id(session: AsyncSession, form_id: int) -> Form | None:
   return await session.get(Form, form_id)

async def get_formContent_by_shareURL(session: AsyncSession, form_share_url: str) -> Form | None:
   result = await session.execute( 
      update(Form)
         .where(Form.share_url == form_share_url)
         .values(visits = Form.visits + 1 )
         .returning(Form) )
   
   await session.commit()
   form = result.scalars().first()

   if not form:
      raise HTTPException(status_code=404, detail="Form not found")
   
   # content = json.loads(form.content)
   # form.content = json.dumps(content, ensure_ascii=True)
   
   # print(form )
   return form 

async def create_form(session: AsyncSession, 
                      form_in: FormCreate,
                      user: User) -> Form:
   new_form = Form(**form_in.model_dump(),
                   user_id = user.id)
   session.add(new_form)
   await session.commit()
   await session.refresh(new_form)
   return new_form

async def update_form( session: AsyncSession, 
                       form: Form, 
                       form_updated: FormUpdate | FormUpdatePartial,
                       partial_flag: bool = False) -> Form:
   for name, value in form_updated.model_dump(exclude_unset=partial_flag).items():
      setattr(form, name, value)
   await session.commit()
   return form

async def delete_form( session: AsyncSession,
                       form: Form ) -> None:
   await session.delete(form)
   await session.commit()

async def get_form_stats(session: AsyncSession, user: User) :
   stmt = select( 
                  func.sum(Form.visits).label("visits"),
                  func.sum(Form.submissions).label("submissions") 
                ).where(Form.user_id == user.id)
   result = await session.execute(stmt)
   await session.commit()
   stats = result.one()

   visits = stats.visits or 0
   submissions = stats.submissions or 0

   submissions_rate = 0
   if (visits > 0):
      submissions_rate = round((submissions / visits) * 100) or 0
   bounce_rate = round(100 - submissions_rate) or 0

   # print({  "visits": visits,
   #          "submissions": submissions,
   #          "submissionsRate": submissions_rate,
   #          "bounceRate": bounce_rate
   #       })

   return{
            "visits": visits,
            "submissions": submissions,
            "submissionsRate": submissions_rate,
            "bounceRate": bounce_rate
         }

async def get_form_with_submissions(session: AsyncSession, form_id: int) -> Form | None:
   result = await session.execute( 
      select(Form)
         .where(Form.id == form_id)
         .options(selectinload(Form.form_submissions))   )
   
   await session.commit()
   form = result.scalars().first()

   if not form:
      raise HTTPException(status_code=404, detail="Form not found")
   return form 

async def get_form_submission(session: AsyncSession, form_submission_id: int) -> FormSubmission | None:
   result = await session.execute( 
      select(FormSubmission)
         .where(FormSubmission.id == form_submission_id) )
   
   await session.commit()
   form_submission = result.scalars().first()

   if not form_submission:
      raise HTTPException(status_code=404, detail="Form not found")
   return form_submission 

async def update_form_submission(session: AsyncSession, form_submission_id: int, form_submission_in: FormSubmissionUpdate) -> FormSubmission | None:
   result = await session.execute(
      select(FormSubmission).where(FormSubmission.id == form_submission_id ))
   
   form_submission = result.scalars().first()
   
   if not form_submission:
      raise HTTPException(status_code=404, detail="Form submission not found")
   
   for field, value in form_submission_in.dict(exclude_unset=True).items():
      setattr(form_submission, field, value)
   
   await session.commit()
   await session.refresh(form_submission)
   
   return form_submission

async def add_submission_for_form(session: AsyncSession, form_share_url: str, submission: FormSubmission):
   
   result = await session.execute(
      insert(FormSubmission)
         .values( content = submission.content,
                  user_id = submission.user_id,
                  form_id = select(Form.id)
                              .where( Form.share_url == form_share_url,
                                      Form.published == True )
                              .scalar_subquery()
                )
         .returning(FormSubmission) 
      )
   submission = result.scalar_one_or_none();

   if not submission:
      raise HTTPException(status_code=404, detail="Submission missing")

   if submission:
      await session.execute( 
         update(Form)
            .where(Form.id == submission.form_id)
            .values( submissions = Form.submissions + 1 )    )
      
   divisions_result = await session.execute(
      select(Division)
         .where(Division.form_id == submission.form_id))
   divisions:  list[Division | None]  = divisions_result.scalars().all() 

   for division in divisions:
      result = await session.execute(
         select(func.max(CollectionContent.order))
            .where(CollectionContent.division_id == division.id)  )
      max_order = result.scalar() or 0

      new_content = CollectionContent(
         division_id=division.id,
         submission_id=submission.id,
         order= max_order + 1 )
      
      session.add(new_content)
       
   await session.commit()





async def add_article(session: AsyncSession, form_url: str, article_in: ArticleCreate):


   new_form = Form( published=True,
                    submissions = 1,
                    user_id = article_in.user_id,
                    content = article_in.JsonElements,
                    name = f"Main for {article_in.name}")
   session.add(new_form)
   await session.flush() 

   
   result = await session.execute(
      insert(FormSubmission)
         .values( content = article_in.JsonContent,
                  user_id = article_in.user_id,
                  form_id = new_form.id )
         .returning(FormSubmission) )
   submission = result.scalar_one_or_none();

   if not submission:
      raise HTTPException(status_code=404, detail="Submission missing")
      
   divisions_result = await session.execute(
      select(Division)
         .where(Division.form_id == select(Form.id)
                                       .where( Form.share_url == form_url,
                                               Form.published == True )
                                       .scalar_subquery()
               ) 
      )
   divisions:  list[Division]  = divisions_result.scalars().all() 

   for division in divisions:
      result = await session.execute(
         select(func.max(CollectionContent.order))
            .where(CollectionContent.division_id == division.id)  )
      max_order = result.scalar() or 0

      new_content = CollectionContent(
         division_id=division.id,
         submission_id=submission.id,
         order= max_order + 1 )
      
      session.add(new_content)
   await session.commit()

   return {new_form.id, submission.id}



   
   