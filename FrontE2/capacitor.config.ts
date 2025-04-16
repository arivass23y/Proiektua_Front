import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'FrontE2',
  webDir: 'www',
  plugins: {
    "GoogleAuth": {
      "scopes": ["profile", "email"],
      "serverClientId": "862214888792-r4fau3jo13m2mhurf203k34st03i3oma.apps.googleusercontent.com",
      "forceCodeForRefreshToken":true
    }
  }
};

export default config;
