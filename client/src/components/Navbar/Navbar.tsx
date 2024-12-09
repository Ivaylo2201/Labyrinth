import NavButton from '../Nav-Button/NavButton';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/logo-white.png';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
    const { isAuthenticated, logout } = useAuth();
    const [logoutClickCount, setLogoutClickCount] = useState(0);
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const openCloseMenu = () => {
        setMenuIsOpen(!menuIsOpen);
    };
    const handleLogout = async () => {
        await logout();
        setLogoutClickCount((prevCount) => prevCount + 1);
    };

    const renderAuthButtons = () => {
        if (logoutClickCount < 2) {
            return (
                <button onClick={handleLogout} className='primary-button'>
                    Log out
                </button>
            );
        } else {
            return (
                <>
                    <NavButton
                        name='Login'
                        location='/login'
                        className='primary-button'
                    />
                    <NavButton
                        name='Register'
                        location='/register'
                        className='primary-button'
                    />
                </>
            );
        }
    };

    const iconMenu = menuIsOpen ? <X /> : <Menu />;
    return (
        <div>
            <nav className='bg-zinc-900 w-full p-3 flex flex-col lg:flex-row '>
                <span className='flex justify-between lg:w-1/2'>
                    <a
                        href={'/'}
                        className='w-2/5 flex direction-col items-center gap-2'
                    >
                        <img src={logo} alt='logo' className='w-11' />
                        <h1 className='text-2xl font-bold text-white'>
                            Labyrinth
                        </h1>
                    </a>
                    <button
                        className={`text-white lg:hidden `}
                        onClick={openCloseMenu}
                    >
                        {iconMenu}
                    </button>
                </span>
                <div
                    className={`flex flex-col gap-2 ${
                        menuIsOpen ? 'block' : 'hidden'
                    } lg:flex-row lg:justify-between ${
                        menuIsOpen ? 'lg:flex' : 'lg:flex'
                    } lg:w-full `}
                >
                    <div className='flex flex-col gap-2 lg:flex-row lg:gap-5'>
                        <NavButton
                            name='For buy'
                            location='/properties?status=buy'
                            className='primary-button'
                        />
                        <NavButton
                            name='For rent'
                            location='/properties?status=rent'
                            className='primary-button'
                        />
                        {isAuthenticated && (
                            <>
                                <NavButton
                                    name='Add property'
                                    location='/add-property'
                                    className='primary-button' 
                                />
                                <NavButton
                                    name="Your properties" 
                                    location='/profile/properties' 
                                    className='primary-button'
                                 />
                            </>
                        )}
                        <NavButton
                                name='Admin'
                                location='/admin'
                                className='primary-button'
                            />
                    </div>
                    <div className='text-white flex justify-center text-lg gap-3'>
                        {isAuthenticated ? (
                            renderAuthButtons()
                        ) : (
                            <span className='flex flex-col gap-2 lg:flex-row lg:gap-3'>
                                <NavButton
                                    name='Login'
                                    location='/login'
                                    className='primary-button'
                                />
                                <NavButton
                                    name='Register'
                                    location='/register'
                                    className='primary-button'
                                />
                            </span>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
