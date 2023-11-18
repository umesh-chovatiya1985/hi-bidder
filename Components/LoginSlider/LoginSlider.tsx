import React from 'react'
import styles from '../../styles/Drawer.module.css'

export const LoginSlider = ({drawerStatus, closeDrawerBar}: any) => {

    const getDrawerStatus = () => {
        if (drawerStatus) return styles["sidebarmenuopen"];
        else return styles["sidebarmenuclose"];
    };

    const getDrawerOverlay = () => {
        if (drawerStatus) return styles["sidebaroverlayclose"];
        else return styles["sidebaroverlayopen"];
    };  
    
  return (
    <>
        <div className={`${styles.sidebaroverlay} ${getDrawerOverlay()}`} onClick={closeDrawerBar}></div>
        <div className={`${styles.sidebarmenu} ${getDrawerStatus()}`}>
            <div>Login is Here</div>   
        </div>
    </>
  )
};