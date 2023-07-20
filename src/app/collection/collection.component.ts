import { Component } from '@angular/core';
import { ConnectService, ObjectVrakkaNFT } from '../services/connect.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent {

  constructor( connect: ConnectService, private Vrakka: ObjectVrakkaNFT){


  }


  metaData: any = []

 async ngOnInit(){
    await this.Vrakka.load()
    this.metaData = await this.Vrakka.fillData()
    console.log(this.metaData)
  }

}
