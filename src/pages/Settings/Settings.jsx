import styles from './Settings.module.css';
import ChangePassword from '../../components/UserUpdates/ChangePassword';
import { useState } from 'react';
import ModalComponent from '../../components/ModalComponent/ModalComponent';
import UpdateDetails from '../../components/UserUpdates/UpdateDetails';

export default function Settings(){
    const[isOpen,setIsOpen] = useState(false);
    const[isUpdate,setIsUpdate] = useState(false);

    function handleClick(e){
        const targetName = e.target.getAttribute('data-name');
        if(targetName === 'pwd') 
            setIsOpen(true);
        else    
            setIsUpdate(true);
    }

    return <>
        <div className={styles.settingsContainer}>
            <h3>Settings & privacy </h3>
            <div onClick={handleClick} data-name="pwd" >Change Password</div>
            <div onClick={handleClick} data-name="update" >Update Details</div>
            {/* <Link to='/' >Update Details</Link> */}
        </div>

        {isOpen && <ModalComponent isOpen={isOpen} onClose={()=>setIsOpen(false)}>
                <ChangePassword />
        </ModalComponent> }
        { isUpdate &&
        <ModalComponent isOpen={isUpdate} onClose={()=>setIsUpdate(false)}>
                <UpdateDetails  />
        </ModalComponent> }
    </>    
}
