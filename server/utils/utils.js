export const sanitizeUserData = (userData) => {
    if (!userData) return null;
    const { password, ...sanitizedUserData } = userData?.toObject();

    return sanitizedUserData
}

export const errorCreator = (message, status) => {
    const error = new Error(message);
    error.status = status;
    throw error;
}

export const responseCreator = (message, data) => {
    return { message, data }
}
