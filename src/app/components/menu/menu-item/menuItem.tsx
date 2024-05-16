import React from 'react';
import Styles from '../menu.module.css';
import Link from 'next/link';

interface MenuItemProps {
    title: string;
    link: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ title, link }) => {
    return (
        <Link 
            className={Styles.item}
            href={link}
        >
            <h3 className={Styles.title}>{title}</h3>
        </Link>
    );
}

export default MenuItem;
