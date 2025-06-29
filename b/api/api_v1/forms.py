
from typing import TYPE_CHECKING, Annotated
from api.dependencies.form import form_by_id
from core.config import settings
from sqlalchemy.ext.asyncio import AsyncSession

from fastapi import APIRouter, Depends, Path, status
from core.crud import form
from core.models import db_helper
from core.models.user import User
 
from core.schemas.form import AddSubmissions, ArticleCreate, ArticleCreateReq, FormCreate, FormRead, Form, FormSubmissionUpdate, FormSubmissionsReq, FormUpdate, FormUpdatePartial,  MainForm
from api.dependencies.authentication import fastapi_users

if TYPE_CHECKING:
   from sqlalchemy.ext.asyncio import AsyncSession

router = APIRouter(
   prefix=settings.api.v1.forms,
   tags=["Forms"]    )



@router.get("", response_model=list[Form])
async def get_forms(session: Annotated[  "AsyncSession",
                                          Depends(db_helper.session_getter)] ):
   return await form.get_forms(session=session)

@router.get("/GetFormStats", response_model=dict)
async def get_stats( user: Annotated[  User, 
                                       Depends(fastapi_users.current_user(active=True))],
                     session: AsyncSession = Depends(db_helper.session_getter), ):
   return await form.get_form_stats( session=session,
                                     user=user)

@router.get("/{form_id}", response_model=Form)
async def get_form_by_id(form: Form = Depends(form_by_id) ):
   return form


@router.get("/{form_shareURL}/formContent", response_model=Form)
async def get_formContent_by_shareURL(form_shareURL: str,
                                      session: AsyncSession = Depends(db_helper.session_getter), ):
   return await form.get_formContent_by_shareURL(session=session, 
                                                 form_share_url=form_shareURL)

@router.get("/{form_id}/formSubmissions", response_model=MainForm)
async def get_form_with_submissions( form_id: Annotated[int, Path], 
                                     session: Annotated[  "AsyncSession",
                                                          Depends(db_helper.session_getter)] ):
   return await form.get_form_with_submissions( session= session, 
                                                form_id = form_id) 

@router.get("/formSubmission/{form_submission_id}/", response_model=FormSubmissionsReq)
async def get_form_submissions( form_submission_id: Annotated[int, Path], 
                                     session: Annotated[  "AsyncSession",
                                                          Depends(db_helper.session_getter)] ):
   return await form.get_form_submission( session= session, 
                                                form_submission_id = form_submission_id) 



@router.post("/{form_shareURL}/addSubmission")
async def add_submission( form_shareURL: str, 
                           submission: AddSubmissions,
                           session: Annotated[  "AsyncSession",
                                                Depends(db_helper.session_getter)] ):
   return await form.add_submission_for_form( session= session, 
                                              form_share_url=form_shareURL,
                                              submission= submission) 

@router.post("/{form_shareURL}/addArticle")
async def add_submission_aka_article(  article_in: ArticleCreate,
                                       form_shareURL: str, 
                                       session: Annotated[  "AsyncSession",
                                                Depends(db_helper.session_getter)] ):
   return await form.add_article( session= session, 
                                  form_url=form_shareURL,
                                  article_in=article_in) 



@router.post("", response_model=FormRead)
async def create_form(  form_in: FormCreate, 
                        session: Annotated[  "AsyncSession",
                                              Depends(db_helper.session_getter)],
                        user: Annotated[ User, 
                                         Depends(fastapi_users.current_user(active=True))] ):
   return await form.create_form( session=session, 
                                  form_in=form_in,
                                  user= user )


@router.put("/{form_id}", response_model= FormRead)
async def update_form( form_updated:  FormUpdate,
                       form_in: Form = Depends(form_by_id),
                       session: AsyncSession = Depends(db_helper.session_getter) ):
   return await form.update_form(session=session,
                                 form=form_in,
                                 form_updated=form_updated)

@router.patch("/{form_id}", response_model= FormRead)
async def partial_update_form( form_updated:  FormUpdatePartial,
                               form_in: Form = Depends(form_by_id),
                               session: AsyncSession = Depends(db_helper.session_getter) ):
   return await form.update_form(session=session,
                                 form=form_in,
                                 form_updated=form_updated,
                                 partial_flag=True)


@router.patch("/formSubmission/{form_submission_id}/", response_model=FormSubmissionUpdate)
async def update_form_submissions( form_submission_id: Annotated[int, Path], 
                                     form_submission_in: FormSubmissionUpdate,
                                     session: Annotated[  "AsyncSession",
                                                          Depends(db_helper.session_getter)] ):
   return await form.update_form_submission( session= session, 
                                             form_submission_in = form_submission_in,
                                             form_submission_id = form_submission_id) 


@router.delete("/{form_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_form( form_in: Form = Depends(form_by_id),
                       session: AsyncSession = Depends(db_helper.session_getter) ):
   await form.delete_form(session=session,
                          form = form_in)
   


