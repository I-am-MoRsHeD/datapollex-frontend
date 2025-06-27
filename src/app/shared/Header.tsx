import React from 'react';

const Header = ({ user }: { user: string }) => {
    return (
        <>
            <div className='border-b border-gray-300 rounded-xl'>
                <div className='max-w-6xl h-20 mx-auto flex flex-row justify-between items-center'>
                    <h1 className="text-xl font-semibold text-white">Welcome, {user}</h1>
                    <button className='bg-white text-black py-2 px-4 rounded hover:border border-gray-300 hover:text-white hover:bg-black cursor-pointer'>
                        Logout
                    </button>
                </div>
            </div>
        </>
    );
};

export default Header;