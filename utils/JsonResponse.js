export const successJson = (message = null, data = null) => {
    return {
        success: true,
        message,
        data,
    };
};
export const errorJson = (message = null, data = null) => {
    return {
        success: false,
        message,
        data,
    };
};
