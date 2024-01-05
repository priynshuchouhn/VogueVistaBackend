import bcrypt from 'bcrypt';

const saltRounds = 10
export const createHashedPassword = async (password: string) : Promise<String | Error> => {
    try {
        const hash = await bcrypt.hash(password, saltRounds);
        return hash;
    } catch (error) {
        let message = 'Encryption Failed';
        if (error instanceof Error) message = error.message;
        throw new Error(message);
    }
}


export const verifyPassword =async (password: string,hashedPassword:string) => {
    try {
        const isMatch = await bcrypt.compare(password, hashedPassword);
        if (isMatch) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Password comparison error:', error);
        let message = 'Password comparison error';
        if (error instanceof Error) message = error.message;
        throw new Error(message);
    }
}