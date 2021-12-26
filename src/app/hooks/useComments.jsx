import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router";
import { useAuth } from "./useAuth";
import { nanoid } from "nanoid";
import commentService from "../services/comment.service";

import { toast } from "react-toastify";

const CommentsContext = React.createContext();

export const useComments = () => {
    return useContext(CommentsContext);
};

export const CommentsProvider = ({ children }) => {
    const { userId } = useParams();
    const { currentUser } = useAuth();
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        setComments(null);
        setLoading(false);
    }, []);

    async function createComment(data) {
        const comment = {
            ...data,
            _id: nanoid(),
            pageId: userId,
            useId: currentUser._id,
            created_at: Date.now()
        };

        try {
            const { content } = await commentService.createComment(comment);
            console.log(content);
        } catch (error) {
            errorCatcher(error);
        }

        console.log(comment);
    }

    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);

    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    }

    return (
        <CommentsContext.Provider
            value={{ comments, createComment, isLoading }}
        >
            {children}
        </CommentsContext.Provider>
    );
};

CommentsProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};