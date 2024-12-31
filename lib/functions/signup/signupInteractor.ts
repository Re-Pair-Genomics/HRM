import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcryptjs';
import { SignupInputData } from './signupInputData';
import { SignupDataAccessInterface } from './signupDataAccess';
import { UserSchema } from '../../schemas/userSchema';

export async function signupInteractor(
    input: SignupInputData,
    dataAccess: SignupDataAccessInterface
) {
    try {
        // Validate input
        if (!input.username || !input.email || !input.password) {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    message: 'Username, email, and password are required.'
                })
            };
        }

        // Create a new user object
        const { username, email, password } = input;
        const userId = uuidv4();
        const newUser: UserSchema = {
            userId: 'USER#' + userId,
            dataType: 'USER',
            username: username,
            email: email,
            password: await bcrypt.hash(password, 10),
            organization: null,
            profile: null,
            actions: {},
            paymentInfo: null,
            createdDate: new Date().toISOString(),
            hireDate: null,
            isActive: true
        };

        // Save the new user to the database
        await dataAccess.createUser(newUser);

        // Return server response
        return {
            statusCode: 201,
            body: JSON.stringify({
                message: 'User created successfully',
                user: {
                    id: userId,
                    username,
                    email
                }
            })
        };
    } catch (error: any) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Server error: ' + error.message })
        };
    }
}
