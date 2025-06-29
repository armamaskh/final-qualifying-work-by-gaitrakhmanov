
import { GetCollectionById } from '@/api/collection';
import CollectionConstructor from '@/components/CollectionConstructor/CollectionConstructor';
import ConstructorContextProvider from '@/components/Context/ConstructorContext';

interface ConstructorPageProps {
  params: Promise<{ id: string }>; }

async function ConstructorPage( {params}:ConstructorPageProps ) {
  const {id} = await params;
  
  const collection = await GetCollectionById(Number(id));

  if (!collection) {
    return <div>Коллекция не найдена</div>; }

  return (
    <div className='flex flex-col justify-center items-center w-full min-h-full h-full max-h-auto'>
      <ConstructorContextProvider>
        <CollectionConstructor collection_id={Number(id)} collection_name={collection.name} />
      </ConstructorContextProvider>
    </div>);
    
}

export default ConstructorPage;
