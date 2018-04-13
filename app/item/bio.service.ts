import { Injectable } from "@angular/core";

var Sqlite = require("nativescript-sqlite");

@Injectable()
export class BioService {
    connectDB(): void {
        var db_promise = new Sqlite("MyTable", function (err, db) {
            if (err) {
                console.error("We failed to open database", err);
            } else {
                // This should ALWAYS be true, db object is open in the "Callback" if no errors occurred
                console.log("Are we open yet (Inside Callback)? ", db.isOpen() ? "Yes" : "No"); // Yes
            }
        });

        db_promise.then(function (db) {
            // This should ALWAYS be true, db object is open in the "then"
            console.log("Are we open yet (Inside Promise)? ", db.isOpen() ? "Yes" : "No"); // Yes
            db.close();
        }, function (err) {
            console.error("We failed to open database", err);
        });
    }

    createTable(): void {
        new Sqlite("MyTable", function (err, db) {
            db.version(function (err, ver) {
                if (ver === 0) {
                    try {
                        db.execSQL(`
                            create table users (
                                id int(11) auto_increment primary key,
                                name varchar(50),
                                height float,
                                weight float,
                                dob Date,
                                dueDate Date
                            )
                         `);
                    } catch (e) {
                        console.log(e);
                    }
                    db.version(1); // Sets the version to 1
                }
            });
        });
    }

    insertUser(): void {
        new Sqlite("MyTable", function (err, db) {
            db.version(function (err, ver) {
                if (ver === 0) {
                    db.execSQL(`    
                    insert into users (name, height, weight, dob, dueDate)
                    values ('春梅','153','46.5','1986-10-09', '2018-08-08')
                `);
                    db.version(1); // Sets the version to 1
                }
            });
        });
    }

    /*
create table users
(
	id int(11) auto_increment primary key,
	name varchar(50),
	height float,
	weight float,
	dob Date,
	dueDate Date
)


insert into users (name, height, weight, dob, dueDate) values ('春梅','153','46.5','1986-10-09', '2018-08-08')

    */
}
