//This file watches your src folder and tries to translate
//all source files on the fly to produce a Hydrarchy.json file
var acorn = require("acorn");
const fsWalk = require('@nodelib/fs.walk');
var gulp = require('gulp');
var concat = require('gulp-concat');


class Source{
    constructor(dir){
        this.dir = dir
        this.result = this.sourceMerge()
        //this.parsed = this.parseIt()
        //console.log(this.parsed)
        
    }
    async sourceMerge(){

        await new Promise((resolve, reject)=>{
            gulp.src("./*.js")
                .pipe(concat('all.js'))
                .pipe(gulp.dest("./merged.js"))
                .on("finish", resolve)
                .on("error", reject)
        });
        
    }
    paths(dir){
        //takes files in directory and writes them all into a single file
        var filepaths=[]
        fsWalk.walk(dir, (error, entries) => {
            entries.forEach(element => {
              if (element.path.split('.').pop() == "js")
              filepaths.push(element.path)
            });
          });
        var outputPath = './merged.js'
    
        return filepaths

    }
    parseIt(){
        return acorn.parse(this.sourced, {ecmaVersion: 2020})
    }
    next(){
        //

    }
}

class Translator{
    constructor(source){


    }
    produceSourceSchema(source){

        //take source and parse.        


    }

    isClass(){

    }
    isFunc(){

    }

    parse(source){
        while(obj = source.next_object()){
            //if its a class, produce class schema object
            if (this.isClass(obj)){

            }

            //if its a function, produce function schema object
            if (this.isFunc(obj)){

            }
        }


    }

}

var source = new Source('./')
