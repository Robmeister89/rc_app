import { Component } from '@angular/core';
import { ToastController, NavController, NavParams } from '@ionic/angular';
import { LoggingService } from '../logging.service';
import { FirestoreService } from '../firestore.service';
import { Note } from '../note.model';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page {

  constructor(private toastController: ToastController,
    public ls: LoggingService,
    private fs: FirestoreService ) { }

  notes: any = [];

  ngOnInit(){
    this.getNotes(this.ls.userName);
  }

  note: Note;
  noteTitle: string;
  noteValue: string;

  async buttonClick(title: string, text: string){
    if(title != ''){
      this.noteTitle = title;
      this.noteValue = text;
      const toast2 = await this.toastController.create({
        message: this.noteTitle + ' saved...',
        duration: 2000,
        color: 'tertiary',
        position: 'top',
        translucent: true,
      });
      toast2.present();
      this.fs.createNote(this.noteTitle,this.noteValue);
      this.notes = this.fs.getNotes(this.ls.userName);
      this.noteTitle = "";
      this.noteValue = "";
      this.note = null;
    }
  }

  async getNotes(username: string) {
    this.notes = await this.fs.getNotes(username);
  }

  async getNote(n: Note) {
    this.note = await this.fs.getNote(this.ls.userName, n.title);
    this.noteTitle = this.note.title;
    this.noteValue = this.note.value;
  }


}
