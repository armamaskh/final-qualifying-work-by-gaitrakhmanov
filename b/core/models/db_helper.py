from collections.abc import AsyncGenerator
from sqlalchemy.ext.asyncio import (create_async_engine, AsyncEngine, 
                                    async_sessionmaker, AsyncSession)
from core.config import settings



class DataBaseHelper:
   def __init__(self, url: str,                       # Ссылка на подключение к СУБД
                      echo: bool = False,             # Логирования при каждом взаимодействии 
                      echo_pool: bool = False,        # Логирование соединения
                      pool_size: int = 5,             # Число активных соединений с БД
                      max_overflow: int = 10 ):       # Число доп. соединений с БД(Итого: 15)
      
      # Настройка драйвера для подключения к субд  
      self.engine: AsyncEngine = create_async_engine( url = url, 
                                                      echo = echo,
                                                      echo_pool = echo_pool,
                                                      pool_size = pool_size,
                                                      max_overflow = max_overflow )
      
      # Объявление создателя сессий(= подключений)
      self.session_factory: async_sessionmaker[AsyncSession] = async_sessionmaker(
         bind = self.engine,              # Указание движка, который будет использовать
         autoflush = False,               # |
         autocommit = False,              # | Параметры для закрепления данных в БД
         expire_on_commit = False )       # |
      
      
   # Закрытие соединения для текущего драйвера
   async def dispose(self) -> None: 
      await self.engine.dispose() 


   # создание и использование сессии с БД 
   async def session_getter(self) -> AsyncGenerator[AsyncSession, None]:
      async with self.session_factory() as session:
         yield session 
         await session.close()



#! ИНИЦИАЛИЗИРУЕМ
db_helper = DataBaseHelper( url = str( settings.db.url ),
                            echo = settings.db.echo,
                            echo_pool = settings.db.echo_pool,
                            pool_size = settings.db.pool_size,
                            max_overflow = settings.db.max_overflow )
         