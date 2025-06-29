
import IconHomeHeader from '@/components/Assets/icons/IconHomeHeader';
import { CollectionCards } from '@/components/CustomElementsUI/CollectionCards/CollectionCards';
import CreateCollectionButton from '@/components/CustomElementsUI/CollectionCards/CreateCollectionButton';
import { Suspense } from 'react';



export default function HomePage() {

  return ( <div className="flex flex-col w-[80%] h-full container">
            <div className='flex flex-col justify-center'>

              <header className='flex items-start justify-evenly w-full h-full p-8'>
                <IconHomeHeader />
              </header>

              <div className='flex justify-center'>
                <div className="flex flex-col gap-16 my-25">
                  <Suspense fallback={<CollectionCards  />}>
                    <CollectionCards/>
                  </Suspense>
                </div>
              </div>
            </div>
            <div className='w-full h-full mb-[20px]'>
            <CreateCollectionButton />
            </div>
          </div> );
}




