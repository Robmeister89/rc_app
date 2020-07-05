import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Dialogs } from '@ionic-native/dialogs/ngx';
import { LoggingService } from '../logging.service';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { FirestoreService } from '../firestore.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  providers: [Dialogs]
})
export class Tab1Page {

  constructor(private toastController: ToastController, 
    private dialogs: Dialogs,
    public loggingService: LoggingService,
    private fs: FirestoreService,
    public afs: AngularFirestoreModule) { }
  
  username: string = "user1";
  password: string = "password";
  register: boolean = false;


  async logIn(user: string, pass: string) {
    if(!this.register)
    {
      const pass_ = await this.fs.getPassword(user);
      if(pass_ == this.password) // password is correct
      {
        const toast = await this.toastController.create({
          message: "Welcome, " + user,
          duration: 2000,
          color: 'tertiary',
          position: 'top',
          translucent: true,
        });
        toast.present();
        this.loggingService.loggedIn = true;
        this.loggingService.userName = user;
      }
      else // password is wrong
      {
        const toast = await this.toastController.create({
          message: pass_, //"Incorrect username or password.",
          duration: 2000,
          color: 'danger',
          position: 'top',
          translucent: true,
        });
        toast.present();
        this.loggingService.loggedIn = false;
        this.loggingService.userName = "";
      }
    }
    else // create a new account and login
    {
      const check = this.fs.checkUserName(this.username);
      if(!check){
        this.fs.createUser(this.username, this.password);
        const toast = await this.toastController.create({
          message: this.username +  " account has been created",
          duration: 2000,
          color: 'success',
          position: 'top',
          translucent: true,
        });
        toast.present();
        this.loggingService.loggedIn = true;
        this.loggingService.userName = this.username;
      }
      else {
        const toast = await this.toastController.create({
          message: this.username +  " account already exists",
          duration: 2000,
          color: 'success',
          position: 'top',
          translucent: true,
        });
        toast.present();
      }
    }
  }


  async logOut(){
    const toast = await this.toastController.create({
      message: "Logging out " + this.loggingService.userName + "...",
      duration: 2000,
      color: 'tertiary',
      position: 'top',
      translucent: true,
    });
    this.loggingService.loggedIn = false;
    this.loggingService.userName = "";
    toast.present();
  }


}
