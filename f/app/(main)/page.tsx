import { ReactNode, Suspense } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { LuView } from "react-icons/lu"
import { FaWpforms } from "react-icons/fa"
import { HiCursorClick } from "react-icons/hi"
import { TbArrowBounce } from "react-icons/tb"
import { Separator } from "@/components/ui/separator";
import CreateFormButton from "@/components/CreateFormButton";
import {form} from "@/types/models"
import { Badge } from "@/components/ui/badge";
import { formatDistance } from "date-fns";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {BiRightArrowAlt} from 'react-icons/bi'
import {FaEdit} from 'react-icons/fa'
import { GetForms, GetFormStats } from "@/api/form";


export default function Home() {
  return (
    <div className="w-[85%] container">
      <Suspense fallback={<StatsCards loading={true}/>}>
        <CardStatsWrapper/>
      </Suspense>

      <Separator className="my-5"/>
        <h2 className="text-2xl font-bold col-span-2">Your chapters</h2>
      <Separator className="my-5"/>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <CreateFormButton/>
        
        <Suspense fallback={[1, 2, 3, 4].map( (el) =>  (<FormCardSkeleton key={el}/> )  ) }>
          <FormCards/>
        </Suspense>
      </div>
    </div>
  );
}

async function CardStatsWrapper() {
  const stats = await GetFormStats();
  return <StatsCards loading={false} data={stats} />; }

interface StatsCardProps{
  data?: Awaited<ReturnType<typeof GetFormStats>>,
  loading: boolean}

function StatsCards(props: StatsCardProps) {
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



function FormCardSkeleton() {
  return (<Skeleton className="border-2 border-primary-/20 h-[190px] w-full"></Skeleton>)}

async function FormCards() {
  const forms = await GetForms();

  return (<>
            {forms.map((form) => (
              <FormCard key={form.id} form={form} />) ) }
          </> );
}

function FormCard({form}: {form: form}) { 

  return( <Card >
            <CardHeader>
              <CardTitle className="flex items-center gap-2 justify-between">
                <span className="truncate font-bold w-30 overflow-hidden whitespace-nowrap">{form.name}</span>
                {form.published && <Badge>Published</Badge>}
                {!form.published && <Badge variant="destructive">Draft</Badge>}
              </CardTitle>
              <CardDescription>
                {formatDistance(form.created_at, new Date(), {addSuffix: true})}
                {
                  form.published && 
                  (<span className="flex items-center gap-2">
                                      <LuView className="text-muted-foreground"/>
                                      <span>{form.visits.toLocaleString()}</span>
                                      <FaWpforms className="text-muted-foreground"/>
                                      <span>{form.submissions.toLocaleString()}</span>
                                    </span>) }
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[20px] truncate text-sm text-muted-foreground">
              {form.description || "No description"}
            </CardContent>
            <CardFooter>
              {form.published && (
                <Button asChild className="w-full mt-2 text-md gap-4">
                  <Link href={`/forms/${form.id}`} >
                    Просмотр статистики
                    <BiRightArrowAlt/>
                  </Link>
                </Button> )}
              {!form.published && (
                <Button asChild variant="secondary" className="w-full mt-2 text-md gap-4">
                  <Link href={`/builder/${form.id}`} >
                    Изменить форму
                    <FaEdit/>
                  </Link>
                </Button> )}
            </CardFooter>
          </Card> );
 }

