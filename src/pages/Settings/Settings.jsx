import Modal from 'react-modal';
import styles from './Settings.module.css';
import { Link } from 'react-router-dom';

export default function Settings(){
    return <>
        <div className={styles.settingsContainer}>
            <Link to='/changepwd'>Change Password</Link>
            <Link to='/' >Update Details</Link>
        </div>
       {/* <Modal className={styles.modalStyle} isOpen={isOpen}  onRequestClose={()=>setIsOpen(false)}>
                    <h2>Are you ready to submit ?</h2>
                    <button onClick={toScore}>Submit Quiz</button>
                    <button onClick={()=>setIsOpen(false)}>Close</button>
        </Modal> */}
    </>    
}
