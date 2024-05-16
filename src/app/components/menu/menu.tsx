import Styles from './menu.module.css'
import MenuItem from './menu-item/menuItem';

interface MenuItem {
    id: number; // Assuming id is a unique identifier for each menu item
    title: string;
    link: string;
    // Add more properties if there are additional data fields in the menu item
}

interface MenuProps {
    menuList: MenuItem[];
}

const Menu: React.FC<MenuProps> = ({ menuList }) => {
    return (
        <>
            <div className={Styles.menu}>
                {menuList.map( menuItem => (
                    <MenuItem key={menuItem.id} title={menuItem.title} link={menuItem.link}></MenuItem>
                ))}
            </div>
        </>
    );
}

export default Menu;