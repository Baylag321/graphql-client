import { useState } from 'react';
import controlImg from '../../assets/agent/images/control.png';
import logoImg from '../../assets/agent/images/logo.png';
import chartImg from '../../assets/agent/images/Chart.png';
import calendarImg from '../../assets/agent/images/Calendar.png';

const Sidebar = () => {
    const [open, setOpen] = useState(false);
    const Menus = [
        { title: 'Dashboard', src: chartImg },
        { title: 'Inbox', src: calendarImg },
        { title: 'Accounts', src: calendarImg, gap: true },
        { title: 'Schedule ', src: calendarImg },
        { title: 'Search', src: calendarImg },
        { title: 'Analytics', src: calendarImg },
        { title: 'Files ', src: chartImg, gap: true },
        { title: 'Setting', src: chartImg },
    ];

    return (
        <div className="flex">
            <div
                className={`${open ? 'w-72' : 'w-20'} duration-300 h-screen p-5 pt-8 bg-dark-blue relative`}
            >
                <img
                    src={controlImg}
                    alt="control"
                    className={`absolute cursor-pointer rounded-full -right-3 top-9 w-7 border-2 border-dark-blue ${!open && 'rotate-180'}`}
                    onClick={() => setOpen(!open)}
                />
                <div className="flex gap-x-4 items-center">
                    <img
                        src={logoImg}
                        className={`cursor-pointer duration-500 ${open && 'rotate-[360deg]'}`}
                    />
                    <h1
                        className={`text-white origin-left font-medium text-xl duration-300 ${!open && 'scale-0'}`}
                    >
                        Designer
                    </h1>
                </div>
                <ul className="pt-6">
                    {Menus.map((menu, index) => (
                        <li
                            className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md ${menu.gap ? 'mt-9' : 'mt-2'} ${index === 0 && 'bg-light-white'}`}
                            key={index}
                        >
                            <img
                                src={menu.src}
                                alt={menu.title}
                                className="w-5"
                            />
                            <span
                                className={`${!open && 'hidden'} origin-left duration-300`}
                            >
                                {menu.title}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="p-7 text-2xl font-semibold flex-1 h-screen">
                <h1>Home Page</h1>
            </div>
        </div>
    );
};

export default Sidebar;
