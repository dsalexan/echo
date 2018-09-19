import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '../../../node_modules/@ionic-native/sqlite';

@Injectable()
export class DatabaseProvider {

  constructor(private sqlite: SQLite) { }

  public getDB(){ //responsável pelo codigo do sqlite pra pegar o banco de dados
    return this.sqlite.create({
      name: 'produto.db',
      location: 'default'
    })
  }

  public createDataBase(){
    return this.getDB()
      .then((db: SQLiteObject) => {


      })
      .catch(e => console.error(e));

  }
  
  private createTables(db: SQLiteObject){

  }

}
