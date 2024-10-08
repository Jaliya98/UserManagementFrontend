import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withFetch } from '@angular/common/http';  // Import necessary functions

// Include additional providers in the appConfig if needed
const updatedAppConfig = {
  ...appConfig,
  providers: [
    ...appConfig.providers || [],
    provideHttpClient(withFetch())  // Enable fetch API for HttpClient
  ]
};

bootstrapApplication(AppComponent, updatedAppConfig)
  .catch((err) => console.error(err));
