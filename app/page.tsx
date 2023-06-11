import { CarCard, CustomeFilter, Hero, SearchBar, ShowMore } from '@/components'
import { fuels, yearsOfProduction } from '@/constants';
import { fetchCars } from '@/utils'
import Image from 'next/image'

export default async function Home({ searchParams }) {
  const allcars = await fetchCars({
    manufacturer: searchParams.manufacturer || '',
    year: searchParams.year || 2022,
    fuel: searchParams.fuel || '',
    limit: searchParams.limit || 10,
    model: searchParams.model || '',
  });
  
  const isDataEmpty = !Array.isArray(allcars) || allcars.length < 1 || !allcars;
  
  return (
    <main className="overflow-hidden">
      <Hero />

      <div className='mt-12 padding-x padding-y max-width' id='dicover'>
        <div className='home__text-container'>
          <h1 className='text-4xl font-extrabold'>Car Catalogue</h1>
          <p>Explore the cars you might like</p>
        </div>
        <div className='home__filters'>
          <SearchBar />
          <div className='home__filter-container'>
            <CustomeFilter title='fuel' options={fuels} />
            <CustomeFilter title='year' options={yearsOfProduction} />
          </div>
        </div>

        {!isDataEmpty ? (
          <section>
            <div className='home__cars-wrapper'>
              {allcars?.map((car) => <CarCard car={car} />)}
            </div>
            <ShowMore 
              pageNumber={(searchParams.limit || 10) /10}
              isNext={(searchParams.limit || 10) > allcars.length}
            />
          </section>
        ) : (
          <div>
            <h2 className='text-black text-xl font-bold'>Oops, no results</h2>
            <p>{allcars?.message}</p>
          </div>
        )}

      </div>
    </main>
  )
}
