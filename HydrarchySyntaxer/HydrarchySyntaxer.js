var {Parser} = require("acorn");
var gulp = require('gulp');
var concat = require('gulp-concat');
const fs = require("fs");
const classFields = require('acorn-class-fields');

class HydrarchyParser{
    constructor(inputDir, fileExt, exclusions){
        /*
            Merges Class code for all source files ending with the 
            extension parameter in the inputDir (recursive)
        */
        this.inputDir = inputDir
        this.fileExt = fileExt
        this._outputDir="./tmp/"
        this._outputFile="tmp."+this.fileExt
        this._sourceClassMerge()
        this._classFieldContentArray=[]
        this._classFieldContent()
    }
    _sourceClassMerge(exclusions){
        /*
            Merges all source code with extension irrespective of syntax
        */
        var globs = [this.inputDir+'*/*.'+this.fileExt]
        exclusions.forEach(element=>{
            globs.push('!'+this.inputDir+element)
        })
        gulp.src(globs)     
        .pipe(concat(this._outputFile))
        .pipe(gulp.dest(this._outputFile))
    }
   
    _classFieldContent(){
        /*
            Takes merged source code, and plucks out Class Fields
        */
        var output = this._outputDir+this._outputFile
        const buffer = fs.readFileSync(output);
        const fileContent = buffer.toString();
        this.classFieldContentArray=[]
        Parser.extend(classFields).parse(fileContent).body.forEach(
            element=>{
                if (element.type=="ClassDeclaration"){
                    var buffer = new Buffer.alloc(
                        100000
                    );
                    var bufferOffset=0
                    var fd = fs.openSync(
                        output, 
                        "r+"
                    )
                    fs.readSync(
                        fd, 
                        buffer, 
                        bufferOffset, 
                        element.body.end-element.body.start, 
                        element.body.start, 
                    )
                    bufferOffset+=element.body.end-element.body.start
                    this._classFieldContentArray.push(
                        element.id.name+(buffer.toString(
                            'utf-8',0,bufferOffset-1)
                        )
                    )
                }
            }
        );
        return
    }
}
class HydrarchyTokenizer{
    constructor(){

    }


}


class HydrarchySyntax{
    constructor(){
        this.parsedCode = new HydrarchyParser('../', "js", ['node_modules/', 'node_modules/**/*'])
        this.hydrarchyTokens = new HydrarchyTokenizer(this.parsedCode)
        this.hydrarchySyntax = this.hydrarchySyntax()
    }    
    hydrarchySyntax(){

    }
}


var translator = new Translator()


//The Job of the Translator is to Take the Source Code that we wish to document
//And translate it into the following schema:
/*  
    {
        className1:{
            methods:{
                name1:{
                    param1:""
                },
                name2:{
                    param1:""
                }
            }
        },
        className2:{
        }
    }
*/