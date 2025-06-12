import { useEffect } from "react";
import socket from "../../socket";

export default function useCommentSocket(postId, {
    onCommentCreate,
    onCommentDelete,
    onCommentEdit
}) {
    useEffect(() => {
        if (!postId) return;

        socket.on("commentCreated", ({ postId: pid, comment }) => {
            if (pid === postId) onCommentCreate?.(comment);
        });

        socket.on("commentDeleted", ({ postId: pid, commentId }) => {
            if (pid === postId) onCommentDelete?.(commentId);
        });

        socket.on("commentEdited", ({ postId: pid, commentId, updatedText }) => {
            if (pid === postId) {
                onCommentEdit?.(commentId, updatedText);
            }
        });

        return () => {
            socket.off("commentCreated");
            socket.off("commentDeleted");
            socket.off("commentEdited");
        };
    }, [postId, onCommentCreate, onCommentDelete, onCommentEdit]);
}
