"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { HiCursorClick } from "react-icons/hi"
import { TbArrowBounce } from "react-icons/tb"
import { ReactNode, useEffect, useState} from "react";
import { GetFormStats } from "@/api/form";
import { FaWpforms } from "react-icons/fa"
import { LuView } from "react-icons/lu";






export function CardStatsWrapper() {
  const [stats, setStats] = useState<Awaited<ReturnType<typeof GetFormStats>> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      const fetchData = async () => { // <-- Асинхронная функция внутри useEffect
        try { setLoading(true);
              setError(null);
              const data = await GetFormStats(); // Выполняем асинхронный запрос
              setStats(data); } 
        catch (err) {
          console.error("Failed to fetch form stats:", err);
          setError("Не удалось загрузить статистику."); } 
        finally { setLoading(false); }
      };

    fetchData();
    }, [setLoading, setError, setStats, GetFormStats, ]);

    return (
      <StatsCards loading={loading} data={stats || undefined} />
    );
  }

  // const [stats, setStats] = useState<FormStats | null>(null)

  //   useEffect( () => { GetFormStats().then(setStats)
  //   }, [])

  // return <StatsCards loading={!stats} data={stats || undefined} /> }

interface StatsCardProps{
  data?: Awaited<ReturnType<typeof GetFormStats>>,
  loading: boolean}

export function StatsCards(props: StatsCardProps) {
  const {data, loading} = props;

  return <div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
    <StatsCard title="Общее количество посещений"
               icon={<LuView className="text-foreground"/>}
               helperText="All time form visits"
               value={data?.visits?.toLocaleString() || "0"}
               loading={loading}
               className="shadow-md shadow-foreground"/>

    <StatsCard title="Общее количество заявок"
               icon={<FaWpforms className="text-foreground"/>}
               helperText="All time form visits"
               value={data?.submissions?.toLocaleString() || "0"}
               loading={loading}
               className="shadow-md shadow-foreground"/>

    <StatsCard title="% отправки данных от посещений"
               icon={<HiCursorClick className="text-foreground"/>}
               helperText="Visits that lresult in form submission"
               value={data?.submissionRate?.toString() + "%" || "0" + "%"}
               loading={loading}
               className="shadow-md shadow-foreground"/>

    <StatsCard title="% передумавших подавать данных"
               icon={<TbArrowBounce className="text-foreground"/>}
               helperText="Visits that leave without interacting"
               value={data?.bounceRate?.toString() + "%" || "0" + "%"}
               loading={loading}
               className="shadow-md shadow-foreground"/>
  </div>
}

export function StatsCard({ title,
                            value,
                            helperText,
                            className,
                            loading,
                            icon }:{  title: string,
                                      value: string,
                                      helperText: string,
                                      className: string,
                                      loading: boolean,
                                      icon: ReactNode }) {
      return (
        <Card className={className}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
            {icon}
          </CardHeader>

          <CardContent>
            <div className="text-2xl font-bold">
              { loading && (  <Skeleton>
                                <span className="opacity-0">
                                  0
                                </span>
                              </Skeleton>  
                            ) }
              { !loading && value }
            </div>
            <p className="text-xs text-muted-foreground pt-1">{helperText}</p>
          </CardContent>
        </Card>
      );
  }
