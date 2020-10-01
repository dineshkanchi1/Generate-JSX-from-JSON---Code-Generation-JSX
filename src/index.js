import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
function toTitleCase(str){
    return str.replace(
        /\w\S+/g,
        function(txt){
            return txt.charAt(0).toUpperCase()+txt.substr(1).toLowerCase();
        }
    ).replace(" ","");
}
function toCamelCase(str){
    str=str.replace("-"," ")
    return str.replace(/\s(.)/g, function($1){return $1.toUpperCase();}).replace(/\s/g,'').replace(/^(.)/,function($1){return $1.toLowerCase();});
}
function generateComponent(obj){
    let tag = "<"
    tag += toTitleCase(obj.name)+" "
    if(obj.style!==undefined){
        let styles = Object.keys(obj.style)
        tag += "style={{"
        for(let i=0;i<styles.length;i++){
            tag+=toCamelCase(styles[i])+':"'+obj.style[styles[i]]+'",'
        }
        tag=tag.substr(0,tag.length-1)+"}}"
    }
    if(obj.children !== undefined){
        tag+=">";
        for(let i=0;i<obj.children.length;i++){
            tag+=generateComponent(obj.children[i])
        }
        tag+="</"+toTitleCase(obj.name)+">"
    }else{
        tag+="/>"
    }
    return tag
}
function generateCodeFromObject(obj){
        return generateComponent(obj)
   }
   
module.exports=generateCodeFromObject;


// ReactDOM.render(<App />, document.getElementById("root"));