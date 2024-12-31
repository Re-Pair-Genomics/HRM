export interface UserSchema {
    userId: string;       // partiton key: USER#<id>
    dataType: 'USER';     // sort key: USER
    username: string;
    email: string;
    password: string;
    organization: string | null;
    profile: string | null;
    actions: Record<string, any>;
    paymentInfo: string | null;
    createdDate: string;
    hireDate: string | null;
    isActive: boolean;
}