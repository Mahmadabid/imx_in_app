import { config, passport } from '@imtbl/sdk';

export const createPassportInstance = () => {
    return new passport.Passport({
        baseConfig: new config.ImmutableConfiguration({
            environment: config.Environment.SANDBOX,
        }),
        clientId: process.env.NEXT_PUBLIC_CLIENT_ID || '',
        redirectUri: process.env.NEXT_PUBLIC_URL + 'auth/callback',
        logoutRedirectUri: process.env.NEXT_PUBLIC_URL || '',
        logoutMode: 'redirect',
        audience: 'platform_api',
        scope: 'openid offline_access email transact'
    });
};
