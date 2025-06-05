import Modal from 'react-modal';
import styles from './Settings.module.css';
import { Link } from 'react-router-dom';
import ChangePassword from '../../components/ChangePassword/ChangePassword';
import { useState } from 'react';

export default function Settings(){
    const[isOpen,setIsOpen] = useState(false);

    function handleClick(){
        setIsOpen(true);
    }

    return <>
        <div className={styles.settingsContainer}>
            <div onClick={handleClick} >Change Password</div>
            <Link to='/' >Update Details</Link>
        </div>
    
       <Modal className={styles.modalStyle} isOpen={isOpen}  onRequestClose={()=>setIsOpen(false)}>
                    <ChangePassword />
                    {/* setIsOpen={setIsOpen} */}
                    <button onClick={()=>setIsOpen(false)} className={styles.closeBtn}>Close</button>
        </Modal>
    </>    
}
