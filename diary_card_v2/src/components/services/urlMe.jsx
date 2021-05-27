const urlMe = (string) => {

    let specChars = /('!'|'@'|'#'|'$'|'%'|'^'|'&'|'*'|'('|')'|'+'|'='|'?'|'}'|'{'|']'|'~'|'`'|"'")/g;
    return string.toLowerCase()
                .replace(/ /g,"-")
                .replace(/_/g,"-")
                .replace(specChars,"")

}

export default urlMe;