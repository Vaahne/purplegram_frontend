import Modal from 'react-modal';
import { useError } from '../../context/errorHandlingContext/ErrorContext';
import styles from './ErrorModal.module.css';

export default function ErrorModal(){
    const{error, clearError} = useError();

    return <Modal  isOpen={!!error} onRequestClose={clearError} contentLabel="Error" className={styles.modalContainer} >
            <h2 style={{ color: 'red' }}>Error</h2>
                 <p>{error}</p>
            <button onClick={clearError} style={{ marginTop: '20px' }}>
                Close
            </button>
    </Modal>
}
