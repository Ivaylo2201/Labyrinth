import { Search } from 'lucide-react';
import bg from '../../assets/hero.jpg';
import { useState } from 'react';
import axios from 'axios';

type PropertyFilters = {
    status: string;
    type: string;
    location: string;
};

export default function Home() {
    const [selectedAction, setSelectedAction] = useState<string>('');
    const [selectedType, setSelectedType] = useState<string>('');
    const [location, setLocation] = useState<string>('');

    const handleActionSelectChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setSelectedAction(event.target.value);
    };

    const handleTypeSelectChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setSelectedType(event.target.value);
    };

    const handleLocationInputChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setLocation(event.target.value);
    };

    const searchProperties = async () => {
        const filters: PropertyFilters = {
            status: selectedAction,
            type: selectedType,
            location: location
        };

        const truthyFilters = Object.fromEntries(
            Object.entries(filters).filter(([_, value]) => value !== '')
        );

        const propertiesUrl = new URL('http://127.0.0.1:8000/api/properties');
        propertiesUrl.search = new URLSearchParams(truthyFilters).toString();

        console.log(propertiesUrl.href);

        // const response = await axios.get(propertiesUrl.href);

        // navigate to properties page?
    };

    return (
        <div className='relative h-screen w-full overflow-hidden flex items-center justify-center'>
            <div
                className='absolute inset-0 bg-cover bg-center'
                style={{ backgroundImage: `url(${bg})` }}
            />
            <div className='absolute inset-0 bg-black bg-opacity-50'></div>

            <div className='w-full h-full flex items-center justify-center flex-col '>
                <h2 className='text-6xl mb-4 font-bold relative text-white'>
                    Discover properties with ease.
                </h2>
                <h4 className='text-2xl font-light relative text-white'>
                    Labyrinth helps people find the perfect property for a
                    better life.
                </h4>
                <div className='relative inset-0 flex gap-1 w-3/6 h-12 bg-slate-50 p-2 rounded-full my-10 justify-between'>
                    <div className='relative'>
                        <select
                            onChange={handleActionSelectChange}
                            className='h-8 w-full text-sm bg-transparent text-charcoal font-Montserrat appearance-none mx-2 pr-8 focus:outline-none'
                        >
                            <option value='' selected>
                                Choose a action
                            </option>
                            <option value='buy'>For buy</option>
                            <option value='rent'>For rent</option>
                        </select>
                        <div className='absolute inset-y-0 right-0 flex items-center pointer-events-none'>
                            <svg
                                className='w-4 h-4 text-gray-500'
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='2'
                                    d='M19 9l-7 7-7-7'
                                ></path>
                            </svg>
                        </div>
                    </div>
                    <div className='relative'>
                        <select
                            onChange={handleTypeSelectChange}
                            className='h-8 w-full text-sm text-charcoal font-Montserrat bg-transparent appearance-none pl-1 pr-8 focus:outline-none'
                        >
                            <option value='' selected>
                                Choose a property
                            </option>
                            <option value='apartment'>Apartment</option>
                            <option value='house'>House</option>
                            <option value='garage'>Garage</option>
                            <option value='office'>Office</option>
                        </select>
                        <div className='absolute inset-y-0 right-0 flex items-center pointer-events-none'>
                            <svg
                                className='w-4 h-4 text-gray-500'
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='2'
                                    d='M19 9l-7 7-7-7'
                                ></path>
                            </svg>
                        </div>
                    </div>
                    <input
                        onChange={handleLocationInputChange}
                        type='text'
                        className='text-charcoal font-Montserrat pl-1 focus:outline-none focus:border-transparent bg-[#f8fafc]'
                        name='location'
                        id='location'
                        placeholder='Search for location...'
                    />
                    <button
                        onClick={searchProperties}
                        className='bg-black font-Montserrat text-white rounded-full p-2 flex flex-row text-xl justify-center items-center gap-3 hover:bg-light-charcoal duration-100'
                    >
                        <Search size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
}
