//This file watches your src folder and tries to translate
//all source files on the fly to produce a Hydrarchy.json file
var {Parser} = require("acorn");
var gulp = require('gulp');
var concat = require('gulp-concat');
const fs = require("fs");
const classFields = require('acorn-class-fields');



class Source{
    constructor(dir, output_dir, file){
        this.dir = dir
        this.sourceMerge(dir, output_dir, file)
        this.contentArray=[]
        this.parseIt(output_dir+file)

        
    }
    sourceMerge(dir, output_dir, file){
        gulp.src([  dir+'*/*.js',                 //select all files
                    '!'+dir+'node_modules/',      //exclude folders starting with '_'
                    '!'+dir+'node_modules/**/*'   //exclude sub directories for node modules
        ])     
        .pipe(concat(file))
        .pipe(gulp.dest(output_dir))
    }
   
    parseIt(output){

        const buffer = fs.readFileSync(output);
        const fileContent = buffer.toString();

        this.contentArray=[]
        Parser.extend(classFields).parse(fileContent).body.forEach(
            element=>{
                if (element.type=="ClassDeclaration"){

                    var buffer = new Buffer.alloc(100000);
                    var buffer_offset=0
                    var fd = fs.openSync(output, "r+")
                    fs.readSync(
                        fd, 
                        buffer, 
                        buffer_offset, 
                        element.body.end-element.body.start, 
                        element.body.start, 
                    )
                    buffer_offset+=element.body.end-element.body.start
                    this.contentArray.push(element.id.name+(buffer.toString('utf-8',0,buffer_offset-1)))
                    
                }
            }
        );
        return

    }

    
    next(){

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

var source = new Source('../', "./merged/", 'all.js')
console.log(source.contentArray)