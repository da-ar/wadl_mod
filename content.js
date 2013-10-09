chrome.extension.onMessage.addListener(function(request, sender, sendResponse){
	$("a").each(function(){
		var newString = get_newString($(this), request);
		$(this).text(newString);
	});
	$("h3").each(function(){
		var newString = get_newString($(this), request);
		$(this).text(newString);
	});
	
	$('h3:contains("http")').css("text-decoration","underline").css("cursor","pointer").click(function() {
		shown_uri = $(this).text()
		window.open(shown_uri);
	});
});

function get_newString(obj, request){
    var newString = $(obj).text().replace(/cmeGateway/, 
            request.ip).replace(/{meName}/, 
                'iNX8000/' + request.me).replace(/\/{[a-zA-Z]{2,25}(Name|Path)}\/?/g, 
                    request.eh).replace(/{portId}/, 
                        "1").replace(/{tpQualifier}/, 
                            request.tp);

    return newString;
}

/*
function get_newString(obj, request){
    var newString = $(obj).text().replace(/cmeGateway/, 
            request.ip).replace(/{meName}/, 
                'iNX8000/' + request.me).replace(/{ehName}/, 
                    request.eh).replace(/{olcName}/, 
                        request.eh).replace(/{topoName}/, 
                            request.eh).replace(/{opstName}/, 
                                request.eh).replace(/{cdtmName}/, 
                                    request.eh).replace(/{tpPath}/, 
                                        request.eh).replace(/{portId}/, 
                                            "1").replace(/{tpQualifier}/, 
                                                request.tp);
    
    return newString;
} */
