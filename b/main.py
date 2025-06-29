from fastapi import FastAPI
from fastapi.concurrency import asynccontextmanager
from fastapi.responses import ORJSONResponse
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from core.config import settings 
from api import router as api_router


from core.models import db_helper


@asynccontextmanager
async def lifespan(app: FastAPI):
   # Перед началом работы приложения выполнить...
   yield
   # После завершения работы приложения выполнить...
   await db_helper.dispose()


main_app = FastAPI( default_response_class=ORJSONResponse,
                    lifespan=lifespan)
main_app.add_middleware( CORSMiddleware,
                         allow_origins = ["http://localhost:3000"],
                         allow_credentials = True,
                         allow_methods =["*"],
                         allow_headers = ["*"] )
main_app.include_router( api_router )


if __name__ == "__main__":
   uvicorn.run(   app = "main:main_app", 
                  host = settings.run.host, port = settings.run.port, 
                  reload = True)