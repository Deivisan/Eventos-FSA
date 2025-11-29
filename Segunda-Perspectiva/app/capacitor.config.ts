import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.eventosfsa.app',
  appName: 'EventosFSA',
  webDir: 'out',
  
  // Servidor do seu PC para distribuição
  server: {
    url: 'http://192.168.25.3:3000',
    cleartext: true
  },
  
  // Configurações Android
  android: {
    allowMixedContent: true,
    captureInput: true,
    webContentsDebuggingEnabled: true
  },
  
  // Plugins
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      launchAutoHide: true,
      backgroundColor: '#dc2626',
      androidSplashResourceName: 'splash',
      showSpinner: true,
      spinnerColor: '#ffffff'
    }
  }
};

export default config;
