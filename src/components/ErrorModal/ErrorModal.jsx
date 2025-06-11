import Modal from 'react-modal';
import { useError } from '../../context/errorHandlingContext/ErrorContext';
import styles from './ErrorModal.module.css';
//  This function is a modal that displays when error from the backend response
export default function ErrorModal(){
    const{error, clearError} = useError();

    return <Modal  isOpen={!!error} onRequestClose={clearError} contentLabel="Error" className={styles.modalContainer} >
            <h2 style={{ color: 'red' }}>Error</h2>
            <hr/>
                 <p className={styles.errorMessage}>{error}</p>
            <button className={styles.closeBtn} onClick={clearError} style={{ marginTop: '20px' }}>
                Close
            </button>
    </Modal>
}
