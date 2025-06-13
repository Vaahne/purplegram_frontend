import { useContext, useEffect, useState } from 'react';
import styles from './PostHeader.module.css';
import { FaTimes } from 'react-icons/fa';

export default function PostHeader({ name, photo, date, onClose }) {
    // post header with user image and name and also with close button

    function convertDate() {
        const localDate = new Date(date);

        // Convert to local time (adjusting for timezone if needed)
        const options = { day: "numeric", month: "long" };
        const formattedDate = localDate.toLocaleDateString("en-GB", options); // "3 June"

        const formattedTime = localDate.toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false, // 24-hour format
        });

        // console.log(` formated Date : ${formattedDate} at ${formattedTime}`);
        return `${formattedDate} at ${formattedTime}`;
    }


    return (
         <div className={styles.postHeader}>
            <div className={styles.userInfo}>
                <img className={styles.profilePic} alt="user Profile Picture" src={photo} />
                <div className={styles.textContainer}>
                    <span className={styles.name}>{name}</span>
                    <span className={styles.date}>{convertDate(date)}</span>
                </div>
            </div>
            <button className={styles.closePost} onClick={onClose}>
                <FaTimes />
            </button>
        </div>
    )
}