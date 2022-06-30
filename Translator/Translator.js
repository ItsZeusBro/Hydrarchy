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
        this.result = this.sourceMerge(dir, output_dir, file)
        this.parsed = this.parseIt(output_dir+file)
        console.log(this.parsed)
        
    }
    async sourceMerge(dir, output_dir, file){
        return await new Promise((resolve, reject)=>{
            gulp.src([  dir+'*/*.js',                 //select all files
                        '!'+dir+'node_modules/',      //exclude folders starting with '_'
                        '!'+dir+'node_modules/**/*'   //exclude sub directories for node modules
                ])     
                .pipe(concat(file))
                .pipe(gulp.dest(output_dir))
                .on("finish", resolve)
                .on("error", reject)
        });
    
        
    }
   
    parseIt(output){

        const buffer = fs.readFileSync(output);
        const fileContent = buffer.toString();
        var classContentArray=[]
        Parser.extend(classFields).parse(fileContent).body.forEach(element=>{
            if (element.type=="ClassDeclaration"){
                var buffer = new Buffer.alloc(100000);
                fs.open(output, "r+", function (err, fd){
                    if(err){
                        console.log(err)
                    }
                    console.log("reading from file")
                    fs.read(fd, buffer, 0, element.body.end-element.body.start, element.body.start, function (err, bytes){
                        classContentArray.push(buffer.toString())
                        console.log(buffer.toString())

                    })
                })
            }
        })
        // var tokens = [...acorn.tokenizer(fileContent, {ecmaVersion: 2020})];
        // include=false
        // var classtokens=[]
        // tokens.forEach(element => {
        //     if(element.type.label == 'class'){
        //         include = true

        //     }else{
        //         if(include==true){
        //             //this means push to class tokens and keep include == to true
        //         }else{
        //             //this means

        //         }
        //     }

        // });

        return //acorn.parse(this.sourced, , sourceFile:})
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