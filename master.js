var ip_list = new Array();
var me_list = new Array();
var eh_list = ["shelf/1/slot/5", "shelf/1/slot/7", "shelf/1/slot/11"];
var tp_list = ["eth", "oam", "sdh", "ofs", "ofsm", "ctrl", "cons", "dss"];
var storageArea = chrome.storage.sync;

$(document).ready(function(){		     
		
    // enable autocomplete with stored data		
	refresh_lists();    
    
    // use the data entered to change the WADL
    $("#btnApply").click(function(){
        
        ip = $("#ip").val();
        me = $("#meName").val();
        eh = $("#ehName").val();
        tp = $("#tpQualifier").val();
        // IP is required
        if(ip != "")
        {
            sendValues(ip,me,eh,tp);    
        }        
    });
    
    $("#btnFetch").click(function(){
        cme_ip = "http://" + $("#ip").val() + ":8080";
        window.open(cme_ip);
    });
		
});
	
function sendValues(ip_val,me_val,eh_val,tp_val){
	chrome.tabs.getSelected(null, function(tab) {
	  chrome.tabs.sendMessage(tab.id, {
	      ip: ip_val, 
	      me: me_val, 
	      eh: eh_val, 
	      tp: tp_val
	   });
	});
	
	if($.inArray(ip_val,ip_list) == -1){
	   ip_list.push(ip_val);
	   storageArea.set({'ip_list': ip_list});    
	}
	if($.inArray(me_val,me_list) == -1){
		me_list.push(me_val);
		storageArea.set({'me_list': me_list});
	}
	if($.inArray(eh_val,eh_list) == -1){
	   eh_list.push(eh_val);
	   storageArea.set({'eh_list': eh_list});
	}
	
	if($.inArray(tp_val,tp_list) == -1){
       tp_list.push(tp_val);
       storageArea.set({'tp_list': tp_list});
    }
	
	refresh_lists();
	
}	

function refresh_lists()
{
    
     // fetch any stored data
    storageArea.get(["ip_list", "me_list", "eh_list", "tp_list"], function(items){
        console.log(items);
        if(items.ip_list){
            ip_list = items.ip_list;    
        }                       
        if(items.me_list){
            me_list = items.me_list;    
        }
        
        // we have a default list so only change this if it's been updated
        if(items.eh_list && items.eh_list.length > eh_list)
        {
            eh_list = items.eh_list;    
        }
        
        if(items.tp_list && items.tp_list.length > eh_list)
        {
            tp_list = items.tp_list;    
        }
        
        // Now update the drop down lists
        console.log("updating autocompletes");
        $("#ip").autocomplete({
            source: ip_list
        });
        
        $("#meName").autocomplete({
            source: me_list
        });
        
        $("#ehName").autocomplete({
            source: eh_list
        }); 
        
         $("#tpQualifier").autocomplete({
            source: tp_list
        });       
            
    });
         
}
