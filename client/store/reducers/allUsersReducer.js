import { GET_ALL_USERS, ADD_USER } from "../actionCreators/allUsers";
import { UPDATE_USER, DELETE_USER } from "../actionCreators/singleUser";

export const allUsersReducer = (state = [], action) => {
    if (action.type === GET_ALL_USERS) {
        return (state = [...action.payload]);
    } else if (action.type === ADD_USER) {
        return (state = [...state, action.payload]);
    } else if (action.type === UPDATE_USER) {
        return state.map((user) =>
            user.id !== action.user.id ? user : action.user,
        );
    } else if (action.type === DELETE_USER) {
        return state.filter((user) => user.id !== action.id);
    } else {
        return state;
    }
};
