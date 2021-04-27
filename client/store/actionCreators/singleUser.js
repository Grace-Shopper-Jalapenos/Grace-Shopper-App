import axios from "axios";

export const GET_USER = "GET_USER";
export const SIGN_IN = "SIGN_IN";

export const getUser = (user) => ({
    type: GET_USER,
    payload: user,
});

export const signIn = ({ username, password }) => ({
    type: SIGN_IN,
    username,
    password,
});

export const getSingleUser = (id) => async (dispatch) => {
    try {
        const { data: user } = await axios.get(`/api/users/${id}`);
        dispatch(getUser(user));
    } catch (err) {
        console.error(err);
    }
};

export const authUser = ({ username, password }) => async (dispatch) => {
    try {
        dispatch(signIn({ username, password }));
    } catch (err) {
        console.error(err);
    }
};
