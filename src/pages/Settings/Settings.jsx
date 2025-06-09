import Modal from 'react-modal';
import styles from './Settings.module.css';
import { Link } from 'react-router-dom';
import ChangePassword from '../../components/ChangePassword/ChangePassword';
import { useState } from 'react';
import ModalComponent from '../../components/ModalComponent/ModalComponent';

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

        <ModalComponent isOpen={isOpen} onClose={()=>setIsOpen(false)}>
                <ChangePassword setIsOpen={setIsOpen}/>
        </ModalComponent>

       {/* <Modal className={styles.modalStyle} isOpen={isOpen}  onRequestClose={()=>setIsOpen(false)}>
            <div>
                    <ChangePassword setIsOpen={setIsOpen}/>
            </div>
        </Modal> */}
    </>    
}
