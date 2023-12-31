import { CarProps, FiltersProps } from "@/types";

export const fetchCars = async (filters: FiltersProps) => {
    const  { manufacturer, fuel, limit, model, year } = filters;
	const headers = {
		'X-RapidAPI-Key': '3034e73c9cmsh57c4fa172ae85bep1652dfjsn5f64a75ff1e9',
		'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com'
	}
    const response = await fetch(
        `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&year=${year}&model=${model}&limit=${limit}&fuel_type=${fuel}`,
        {
            headers: headers,
        }
    );

    const result = response.json();

    return result;
}

export const calculateCarRent = (city_mpg: number, year: number) => {
    const basePricePerDay = 50; // Base rental price per day in dollars
    const mileageFactor = 0.1; // Additional rate per mile driven
    const ageFactor = 0.05; // Additional rate per year of vehicle age
  
    // Calculate additional rate based on mileage and age
    const mileageRate = city_mpg * mileageFactor;
    const ageRate = (new Date().getFullYear() - year) * ageFactor;
  
    // Calculate total rental rate per day
    const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;
  
    return rentalRatePerDay.toFixed(0);
  };

export const generateCarImageUrl = (car: CarProps, angle?: String) => {
    const url = new URL('https://cdn.imagin.studio/getimage')

    const { year, model, make } = car;

    url.searchParams.append('customer','hrjavascript-mastery');
    url.searchParams.append('make',make);
    url.searchParams.append('modelFamily',model.split(' ')[0]);
    url.searchParams.append('zoom','fullscreen');
    url.searchParams.append('modelYear',`${year}`);
    url.searchParams.append('angle',`${angle}`);

    return `${url}`;
}

export const updateSearchParams = (type: string, value: string) =>{
    const searchParams = new URLSearchParams(window.location.search);

    searchParams.set(type,value);

    const newPathname = `${window.location.pathname}?${searchParams.toString()}`

    return newPathname;
}