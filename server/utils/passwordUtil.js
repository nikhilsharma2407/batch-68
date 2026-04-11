import { compare, genSalt, hash } from "bcrypt"

export const genPasswordHash = async (password) => {
    const salt = await genSalt(10);
    const passwordHash = await hash(password, salt);
    return passwordHash
}

export const verifyPassword = ({password, passwordHash}) => {
    return compare(password, passwordHash)
}
