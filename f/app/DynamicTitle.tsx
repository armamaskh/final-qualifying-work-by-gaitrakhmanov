"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function DynamicTitle() {
  const pathname = usePathname();

  useEffect(() => {
    let title = "dp | Главная";
    if (pathname.includes("/builder")) 
      title = 'dp | Создатель форм';
    else if (pathname.includes("/constructor"))
      title = 'dp | Конструктор сборника';
    else if (pathname.includes("/home") )
      title = "dp | Сборники";
    else if (pathname.includes("/submit"))
      title = 'dp | Ввод данных';
    else if (pathname.includes("/forms"))
      title = 'dp | Аналитика по форме';
    document.title = title; }, [pathname]);
  return null; }