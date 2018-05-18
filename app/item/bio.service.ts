import { Injectable } from "@angular/core";

var Sqlite = require("nativescript-sqlite");
const dbName = "test.db";

@Injectable()
export class BioService {
    createTable(): void {
        if (!Sqlite.exists(dbName)) {
            console.log('Database does not exist!');
            return;
        }

        new Sqlite(dbName, function (err, db) {
            db.version(function (err, ver) {
                if (ver === 0) {
                    try {
                        db.execSQL(`
                            create table users (
                                id int(11) primary key,
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
        var db_promise = new Sqlite(dbName);
        db_promise.then(function (db) {
            console.log("Open database: ", db.isOpen() ? "Yes" : "No");

            var promise = db.execSQL("insert into users (name, height, weight, dob, dueDate) values (?)", ['春梅', '153', '46.5', '1986-10-09', '2018-08-08']);
            promise.then(function (id) {
                console.log("The new record id is:", id);
            });
        });
    }

    getUser(): void {
        new Sqlite(dbName, function (err, db) {
            console.log("Open database: ", db.isOpen() ? "Yes" : "No");

            db.get('select * from users where name=?', ['春梅'], function (err, row) {
                console.log(err);
                console.log("user is: ", row);
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
