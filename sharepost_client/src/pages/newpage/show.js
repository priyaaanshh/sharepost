import React, { useState } from 'react'

const Show = () => {
    const [num, setNum] = useState(0);

    const randomNum = () => {
        let x = Math.random();
        setNum(x);
    }

    setTimeout(() => {
        randomNum();
    }, 1000);

    return (
        <div className='flex justify-center items-center h-screen w-full text-3xl text-white bg-slate-500'>
            <div className='flex sm:hidden'>
                {num}
            </div>
        </div>
    )
}

export default Show;