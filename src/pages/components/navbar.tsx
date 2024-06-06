import { Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';

export default function Navbar() {
    function onToggleMenu(e: any) {
        const navLinks = document.querySelector('.nav-links');
        if (!navLinks) return;
        e.name = e.name === 'menu' ? 'close' : 'menu';
        navLinks.classList.toggle('top-[-9%]');
    }

    return (
        <header className="bg-white">
            <nav className="flex justify-between items-center w-[92%] mx-auto">
                <div></div>
                <div className="nav-links duration-500 md:static absolute bg-white md:min-h-fit min-h-[60vh] left-0 top-[-100%] md:w-auto  w-full flex items-center px-5">
                    <ul className="flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8">
                        <li>
                            <a href="#">Products</a>
                        </li>
                        <li>
                            <a href="#">Products</a>
                        </li>
                        <li>
                            <a href="#">Products</a>
                        </li>
                        <li>
                            <a href="#">Products</a>
                        </li>
                        <li>
                            <a href="#">Products</a>
                        </li>
                    </ul>
                </div>
                <div className="flex items-center gap-6">
                    <Button type="primary" shape="round">
                        Sign up
                    </Button>
                    <MenuOutlined
                        className="text-3xl cursor-pointer md:hidden"
                        name="menu"
                        onClick={onToggleMenu}
                    />
                </div>
            </nav>
        </header>
    );
}
