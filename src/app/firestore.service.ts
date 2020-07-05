import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { User } from './user.model';
import { Note } from './note.model';
import { Reminder } from './reminder.model';
import { ToDo } from './todo.model';
import { Observable } from 'rxjs';
import { mapToMapExpression } from '@angular/compiler/src/render3/util';
import { LoggingService } from './logging.service';

@Injectable({
    providedIn: 'root'
})
export class FirestoreService {
    constructor(private db: AngularFirestore,
        private loggingService: LoggingService) {}

    async createUser(
        username: string,
        password: string
    ): Promise<void> {
        return this.db.collection('users').doc(username).set({
            username,
            password,
        });
    }

    async checkUserName(
        username: string
        ): Promise<boolean> {
            const userRef = this.db.collection<User>('users', ref => ref.where('username', '==', username));
            userRef.ref.get().then(doc => {
                if(!doc.empty) {
                    this.userExists = true;
                }
            });
            return this.userExists;
    }

    async getPassword(username: string): Promise<string> {
        const user = this.db.collection<User>('users', ref => ref.where('username', '==', username));
        user.valueChanges().subscribe(res => this.password = res[0].password);
        return this.password;
    }

    async createNote(
        title: string,
        value: string): Promise<void> 
        {
            return this.db.collection('users').doc(this.loggingService.userName).collection('notes').doc(title).set({
                title,
                value
            });
    }

    async getNotes(username: string): Promise<any> {
        const notes = await this.db.collection('users').doc(username).collection<Note>('notes').ref.get();
        const notes_ = notes.docs.map(doc => doc.data());
        return notes_;
        //return notes.docs.map(doc => console.log(doc.data()));
    }

    getNote(username: string, title: string): Promise<Note> {
        const note = this.db.collection<Note>('users/'+username+'/notes', ref => ref.where('title', '==', title));
        note.valueChanges().subscribe(res => this.note = res[0]);
        return this.note;
    }


    note: any;
    users: Observable<User>;
    user: User;
    userExists: boolean = false;
    password: any;

}