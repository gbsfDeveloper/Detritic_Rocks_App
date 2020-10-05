import * as DOM from './DOMelements.js';

function addResultStyles(option="add") {
    if (option.localeCompare("add") === 0) {
        DOM.search_resultTitle.addClass("foundTitle");
        DOM.search_resultData.addClass("foundData");  
    } else if(option.localeCompare("remove") === 0){
        DOM.search_resultTitle.removeClass("foundTitle");
        DOM.search_resultData.removeClass("foundData");
    }
}

function getLocalData(userSize){
    $.get(`./tools/fullInfo.json`).done(function(data) {
        for (const element of data) {
            let JSONimage = element['imagenB64'];
            let JSONinfo = element['info'];
            let JSONname = element['sediment'];
            let JSONsize = element['Usize'][0];
            let JSONsize2 = isset(element['Usize'][1]) ? element['Usize'][1] : "";

            if(JSONname.localeCompare("Grava") === 0){
                if(userSize >= JSONsize){
                    htmlView(JSONname,JSONinfo,JSONimage);
                    addResultStyles("add");
                    break;
                }
            }
            else if(JSONname.localeCompare("Arena") === 0){
                if(userSize >= JSONsize && userSize < JSONsize2){
                    htmlView(JSONname,JSONinfo,JSONimage);
                    addResultStyles("add");
                    break;  
                }
            }
            else if(JSONname.localeCompare("Limo") === 0){
                if(userSize >= JSONsize && userSize < JSONsize2){
                    htmlView(JSONname,JSONinfo,JSONimage);
                    addResultStyles("add");
                    break;
                }
            }
            else if(JSONname.localeCompare("Arcilla") === 0){
                if(userSize > 0 && userSize < JSONsize){
                    htmlView(JSONname,JSONinfo,JSONimage);
                    addResultStyles("add");
                    break;
                }
            }
        }
    });
}

function htmlView(JSONname,JSONinfo,JSONimage){
    DOM.search_resultTitle.text(JSONname);
    DOM.search_resultImage.attr('src',`${JSONimage}`);
    DOM.search_resultData.html(JSONinfo);
}

function isset(ref){
    return typeof(ref) !== 'undefined';
}

$(document).ready(function(){
    addResultStyles("remove");
    
    DOM.search_button.on("click",function(){
        const searchValue = DOM.search_input.val();
        getLocalData(searchValue);
        DOM.search_container.addClass( "containerDataFounded" );
        DOM.search_result.addClass("dataFoundedSearchSection");
    });

    DOM.search_input.on("keyup",function(event){
        if(event.keyCode === 13){
            const searchValue = DOM.search_input.val();
            getLocalData(searchValue); 
            DOM.search_container.addClass( "containerDataFounded" );
            DOM.search_result.addClass("dataFoundedSearchSection");
        }
    });
});