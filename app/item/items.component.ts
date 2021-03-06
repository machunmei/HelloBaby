import { Component, OnInit } from "@angular/core";

import { Item } from "./item";
import { BioService } from "./bio.service";

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./items.component.html",
    styleUrls: ["./items-common.css"]
})
export class ItemsComponent implements OnInit {
    

    // This pattern makes use of Angular’s dependency injection implementation to inject an instance of the ItemService service into this class. 
    // Angular knows about this service because it is included in your app’s main NgModule, defined in app.module.ts.
    constructor(private bioService: BioService) { }

    ngOnInit(): void {
       
    }

    onButtonTap() {
        console.log('get');
        this.bioService.getUser();
    }

    insertUser() {
        console.log('insert');
        this.bioService.createTable();
        this.bioService.insertUser();
    }
}
