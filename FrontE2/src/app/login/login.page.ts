import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServiceService } from '../zerbitzuak/login-service.service';
import { firstValueFrom } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { isPlatform } from '@ionic/angular';
declare const google: any;


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string = '';
  password: string = '';
  submitted: boolean = false;
  loginMessage: string = ''; // Para mostrar el mensaje de validación
  loginMessageType: 'success' | 'error' = 'error'; // Para controlar el tipo de mensaje (exito o error)
  selectedLanguage: string = 'es';

  constructor(private router: Router, private loginService: LoginServiceService, private translate: TranslateService) {
    if(!isPlatform('capacitor')){
      GoogleAuth.initialize({
        clientId:'862214888792-r4fau3jo13m2mhurf203k34st03i3oma.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
        grantOfflineAccess:true
      });
    }
  }

  ngOnInit() {
    this.translate.setDefaultLang(this.selectedLanguage);
    GoogleAuth.initialize({
      clientId:'862214888792-r4fau3jo13m2mhurf203k34st03i3oma.apps.googleusercontent.com',
      scopes: ['profile', 'email'],
      grantOfflineAccess:true
    });
  }

  changeLanguage() {
    this.translate.use(this.selectedLanguage);
  }

  selectLanguage(language: string) {
    this.selectedLanguage = language;
    this.changeLanguage();
  }
  
  user='';
  

  async onGoogleLogin() {
    try {
      // Aquí creamos una promesa que se resuelve en el callback de Google
      const idToken = await new Promise<string>((resolve, reject) => {
        google.accounts.id.initialize({
          client_id: '862214888792-r4fau3jo13m2mhurf203k34st03i3oma.apps.googleusercontent.com', // Asegúrate de que es tipo Web
          callback: (response: any) => {
            if (response.credential) {
              resolve(response.credential);
            } else {
              reject('No se recibió credential');
            }
          },
          ux_mode: 'popup',
        });
  
        google.accounts.id.prompt((notification: any) => {
          if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
            reject('El usuario cerró el popup o fue omitido');
          }
        });
      });
  
      const success = await firstValueFrom(this.loginService.loginWithGoogle(idToken));
      
      if (success) {
        this.loginMessage = this.translate.instant('login.messageOk');
        this.loginMessageType = 'success';
        this.router.navigate(['/home']);
      } else {
        this.loginMessage = this.translate.instant('login.messageFail');
        this.loginMessageType = 'error';
      }
    } catch (error) {
      console.error('Google Sign-In error:', error);
      this.loginMessage = this.translate.instant('login.messageNotOk');
      this.loginMessageType = 'error';
    }
  }
  

  // async onGoogleLogin() {
  //   try {
  //     //await GoogleAuth.signOut(); // Limpia sesiones previas
  
  //     const googleUser = await GoogleAuth.signIn();
  //     const idToken = googleUser.authentication.idToken;
  
  //     const success = await firstValueFrom(this.loginService.loginWithGoogle(idToken));
  
  //     if (success) {
  //       this.loginMessage = this.translate.instant('login.messageOk');
  //       this.loginMessageType = 'success';
  //       this.router.navigate(['/home']);
  //     } else {
  //       this.loginMessage = this.translate.instant('login.messageFail');
  //       this.loginMessageType = 'error';
  //     }
  //   } catch (error) {
  //     console.error('Google Sign-In error:', error);
  //     this.loginMessage = this.translate.instant('login.messageNotOk');
  //     this.loginMessageType = 'error';
  //   }
  // }
  
  // async onGoogleLogin() {
  //   this.user= (await GoogleAuth.signIn()).email;
  //   console.log(this.user);
  //   this.router.navigate(['/home']);
    // // google.accounts.id.initialize({
    // //   client_id: '194803716129-2rj4mdmmoktc1o79k0q45kfnv1a5222f.apps.googleusercontent.com', // Sustituye con el tuyo
    // //   callback: async (response: any) => {
    // //     const idToken = response.credential;
  
    // //     try {
    // //       const success = await firstValueFrom(this.loginService.loginWithGoogle(idToken));
  
    // //       if (success) {
    // //         this.loginMessage = this.translate.instant('login.messageOk');
    // //         this.loginMessageType = 'success';
    // //         this.router.navigate(['/home']);
    // //       } else {
    // //         this.loginMessage = this.translate.instant('login.messageFail');
    // //         this.loginMessageType = 'error';
    // //       }
    // //     } catch (error) {
    // //       console.error("Error en Google login:", error);
    // //       this.loginMessage = this.translate.instant('login.messageNotOk');
    // //       this.loginMessageType = 'error';
    // //     }
    // //   }
    // // });
  
    // // google.accounts.id.prompt(); // Esto abre el popup
 // }

  async onLogin() {
    this.submitted = true;

    // Validar si los campos están vacíos
    if (!this.username || !this.password) {
      this.loginMessage = this.translate.instant('login.vacio');
      this.loginMessageType = 'error';
      return;
    }

    try {
      const success = await firstValueFrom(this.loginService.login(this.username, this.password));

      if (success) {
        this.loginMessage = this.translate.instant('login.messageOk');
        this.loginMessageType = 'success';
        this.router.navigate(['/home']);
      } else {
        this.loginMessage = this.translate.instant('login.messageFail');
        this.loginMessageType = 'error';
      }
    } catch (error) {
      console.error("Error en el proceso de login:", error);
      this.loginMessage = this.translate.instant('login.messageNotOk');
      this.loginMessageType = 'error';
    }
  }
}
