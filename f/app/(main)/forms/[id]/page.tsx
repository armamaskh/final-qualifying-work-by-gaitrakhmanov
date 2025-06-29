import { GetFormById, GetFormWithSubmissions } from '@/api/form';
import FormLinkShare from '@/components/FormBuilder/FormLinkShare';
import VisitButton from '@/components/VisitButton';
import React, { ReactNode } from 'react'
import { FaWpforms } from 'react-icons/fa';
import { HiCursorClick } from 'react-icons/hi';
import { LuView } from 'react-icons/lu';
import { TbArrowBounce } from 'react-icons/tb';
import { StatsCard } from '../../page';
import { ElementsType, FormElementInstance } from '@/components/FormElements/FormElements';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { format, formatDistance } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';

interface FormPageProps {
  params: Promise<{ id: string }>; }


async function FormPage( {params}: FormPageProps ) {
  const {id} = await params;
  const form = await GetFormById(Number(id));

  const {visits, submissions} = form;
  let submissionRate = 0;
  if(visits > 0) {
      submissionRate = (submissions/visits) * 100;}
  const bounceRate = 100 - submissionRate;

  if (!form) {
    throw new Error("form not found"); }

  return (
    <>
      <div className="py-10 border-b border-muted">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold truncate">{form.name}</h1>
          <VisitButton shareUrl={form.share_url}/>
        </div>
      </div>
      <div className="py-4 border-b border-muted">
        <div className="flex gap-2 items-center justify-between">
            <FormLinkShare shareUrl={form.share_url}/>
        </div>
      </div>
      <div className='w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
        <StatsCard title="Общее количество посещений"
                       icon={<LuView className="text-foreground"/>}
                       helperText="All time form visits"
                       value={visits.toLocaleString() || ""}
                       loading={false}
                       className="shadow-md shadow-foreground"/>
        
            <StatsCard title="Общее количество заявок"
                       icon={<FaWpforms className="text-foreground"/>}
                       helperText="All time form visits"
                       value={submissions.toLocaleString() || ""}
                       loading={false}
                       className="shadow-md shadow-foreground"/>
        
            <StatsCard title="% отправки данных от посещений"
                       icon={<HiCursorClick className="text-foreground"/>}
                       helperText="Visits that lresult in form submission"
                       value={submissionRate.toLocaleString() + "%" || ""}
                       loading={false}
                       className="shadow-md shadow-foreground"/>
        
            <StatsCard title="% передумавших подавать данных"
                       icon={<TbArrowBounce className="text-foreground"/>}
                       helperText="Visits that leaves without interacting"
                       value={bounceRate.toLocaleString() + "%" || ""}
                       loading={false}
                       className="shadow-md shadow-foreground"/>
      </div>
      <div className='pt-10'>
          <SubmissionTable id={form.id} />
      </div>
    </>
  );
}

export default FormPage;

type Row = {[key: string]: string} & {
  submittedAt: Date};

async function SubmissionTable( {id}: {id: number} ) {
  const form = await GetFormWithSubmissions(id);
  if (!form) {
    throw new Error("Форма не найдена!"); }
  
  const formElements = JSON.parse(form.content) as FormElementInstance[];
  const columns: {
    id: string;
    label: string;
    required: boolean;
    type: ElementsType }[] = [];
  
  formElements.forEach((element) => {
    switch(element.type) {
      case "TextField":
      case "NumberField":
      case "TextAreaField":
      case "DateField":
      case "SelectField":
      case "CheckBoxField":
        columns.push({
          id: element.id,
          label: element.extraAttributes?.label,
          required: element.extraAttributes?.required,
          type: element.type});
      break;
    default:
      break;
    }
  });
  const rows: Row[] = [];
  form.form_submissions.forEach((submission) => {
    // console.log(submission.content)

    const content = JSON.parse(submission.content);
    rows.push({
      ...content,
      submittedAt: submission.created_at
    }) 
  })


  return <>
            <h1 className="text-2xl font-bold my-4">Submissions</h1>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    {columns.map( (column) => (
                      <TableHead key={column.id} className='uppercase'>
                        {column.label}
                      </TableHead>
                    ) )}
                    <TableHead className='text-muted-foreground text-right uppercase'>
                      Submitted at
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {
                    rows.map( (row, index) => (
                        <TableRow key={index} >
                          {
                            columns.map(column => (
                              <RowCell key={column.id} 
                                      type={column.type}
                                      value={row[column.id]}/> ))
                          }
                          <TableCell className='text-muted-foreground text-right'>
                            {formatDistance(row.submittedAt, new Date(), {
                              addSuffix:true })}
                          </TableCell>
                        </TableRow>
                    ))
                  }
                </TableBody>
              </Table>
            </div>
         </>;
}

function RowCell({type, value}:{type: string, value: string}) {
  let node: ReactNode = value;
  
  switch(type) {
    case "DateField":
      if(!value) return;
      const date = new Date(value);
      node = <Badge variant={"outline"}>{format(date, "dd/MM/yyyy")}</Badge>;
      break;
    case "CheckboxField":
      const checked = value === "true";
      node  = <Checkbox checked={checked} disabled />
      break;
  }
  return <TableCell>{node}</TableCell>;
}
