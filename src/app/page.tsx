import Image from "next/image";
import styles from "./page.module.css";

import Menu from "./components/menu/menu";

export default function Home() {
  
  const menuList = [
    {
      id: 1,
      title: 'Tic-Tac-Toe',
      link: 'tic-tac-toe'
    },
    {
      id: 2,
      title: 'Snake',
      link: 'snake'
    },
    {
      id: 3,
      title: 'Memory Cards',
      link: 'memory-cards'
    },
    {
      id: 4,
      title: 'Whack-A-Mole',
      link: 'whack-a-mole'
    }
  ];

  return (
    <main className={styles.mainPage}>
      <h1 className={styles.title}>Game Site</h1>
      <Menu menuList={menuList}></Menu>
    </main>
  );
}
