import Modal from "react-modal";
import styles from "./ModalComponent.module.css";
// A modal component to display the content dynamically based on users actions
export default function ModalComponent({ isOpen, onClose, children }) {
    return (
        <Modal 
            isOpen={isOpen} 
            onRequestClose={onClose} 
            className={styles.modalStyle} 
            overlayClassName={styles.overlay}
        >
            <div className={styles.modalContent}>
                {children} {/* Render passed content dynamically */}
                <button onClick={onClose} className={styles.closeBtn}>Close</button>
            </div>
        </Modal>
    );
}
