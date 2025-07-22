import { APIRequestContext } from '@playwright/test';
import { UserRegistrationData } from '../test-data/generateTestData';

export class ApiHelper {
    private readonly request: APIRequestContext;
    private readonly baseURL: string = 'http://qa-assessment.broadmail.it';

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async registerUser(userData: UserRegistrationData) {
        const response = await this.request.post(`${this.baseURL}/api/auth/register`, {
            data: userData,
        });
        return response;
    }

}
