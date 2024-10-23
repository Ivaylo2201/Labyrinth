import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

const DefaultLayout: React.FC<{ children: React.ReactNode }> = ({
    children
}) => {
    return (
        <div className='min-h-screen flex flex-col'>
            <Navbar />
            <main className='flex flex-grow justify-center items-center'>
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default DefaultLayout;
