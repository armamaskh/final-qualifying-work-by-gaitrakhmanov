from pydantic import BaseModel, PostgresDsn
from pydantic_settings import BaseSettings, SettingsConfigDict

class RunConfig(BaseModel): 
   host: str = '0.0.0.0'
   port: int = 8000

class AccessToken(BaseModel):
   secret: str = '7703a1b86c2351ed45b1109f5f0f0d35ee1f5f9021aea1473e7bcbaac19f7a775157657dc2d0e9cfa40a6a3845fd5361'
   lifetime_seconds: int = 3600
   reset_password_token_secret: str
   verification_token_secret: str

class ApiV1Prefix(BaseModel):
   prefix: str = "/v1"
   auth: str = "/auth"
   users: str = "/users"
   messages: str = "/messages"
   forms: str = "/forms"
   collections: str = "/collections"
   sections: str = "/sections"
   divisions: str = "/divisions"
   generation: str = "/generation"
   
class ApiPrefix(BaseModel):
   prefix: str = "/api"
   v1: ApiV1Prefix = ApiV1Prefix()

   @property
   def bearer_token_url(self) -> str:
      parts = (self.prefix, self.v1.prefix, self.v1.auth, "/login")
      return "".join(parts).removeprefix("/")

class DataBaseConfig(BaseModel):
   url: PostgresDsn
   echo: bool = False                           # Логирования при каждом взаимодействии 
   echo_pool: bool = False                      # Логирование соединения
   pool_size: int = 50                          # Число активных соединений с БД
   max_overflow: int = 10                       # Число доп. соединений с БД(Итого: 15)

   naming_convention: dict[str, str] = {
         "ix": "ix_%(column_0_label)s",
         "uq": "uq_%(table_name)s_%(column_0_N_name)s",
         "ck": "ck_%(table_name)s_%(constraint_name)s",
         "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
         "pk": "pk_%(table_name)s"  }



class Settings(BaseSettings):
   model_config = SettingsConfigDict( 
      env_file = (".env.template", ".env"),     #! Происходит перегрузка м\у 2мя файлами конфигурации
                                                #! каждый следующий файл переопределяет значения предыдущего
      case_sensitive = False,                   # Не реагировать на верхний\нижний регистр
      env_nested_delimiter = "__",              # Настройка разделителя во вложенной объекте
      env_prefix = "APP_CONFIG__")
      

   run: RunConfig = RunConfig()
   api: ApiPrefix = ApiPrefix()
   db: DataBaseConfig 
   access_token: AccessToken 



settings = Settings()
print(settings.db.url)
