////
// @author Nicolas Lantheaume / EDIFIXIO
// @name Communities Customization
// @version 0.2
// @date September, 2018
//
var dropUpload_input2 = function dropUpload_input2() {

	var files = document.getElementById("newfileinput2").files;

	for (var i = 0; i < files.length; i++) {
		upload_bd(files[i], i, files.length - 1);
	}
};
	
var upload_bd = function (file, i, size) {
	var file_name_bd = file.name;

	var form_data = new FormData();
	form_data.append("file", file);
	form_data.append("filename", file_name_bd);
	form_data.append("method", "POST");
	form_data.append("communityUuid", currentCommunityUuid);

	var xhr = new XMLHttpRequest();
	xhr.open("POST", "https://edfx-ldc.edifixio-online.com:8443/ConnectionsCloud/UploadDocument", false);
	xhr.send(form_data);
};

var displayLastSyncDate = function(data) {
	var date = new Date(data);
	var day = eval(date.getDate());
	if(day <10){
		day = "0"+day;
	}
	var month = eval(date.getMonth()+1);
	if(month <10){
		month = "0"+month;
	}
	dojo.query("#icxsynchdate")[0].innerHTML = "Le "+ day + "/" + month+ "/" + date.getFullYear();
};

var currentCommunityGroupsPageMax = 1;

var displayCommunityGroupsPage = function (page) {
	dojo.query(".communitygroup").forEach(function(node){
		dojo.query(node).style("display", "none");		  
	});
	
	dojo.query(".communitygroup."+page).forEach(function(node){
		dojo.query(node).style("display", "");		  
	});
	
	dojo.query(".communitygroup.pager").forEach(dojo.destroy);
	var groupPagerLinks = '<tr class="communitygroup pager"><td><div class="lotusPaging" id=""><ul class="lotusInlinelist lotusLeft">';
	if(page > 1){
		groupPagerLinks = groupPagerLinks + '<li class="lotusFirst" title="Aller à la page '+eval(page-1)+'" onclick="displayCommunityGroupsPage('+eval(page-1)+');return false;">Précédent</li>';
	}
	if(page < currentCommunityGroupsPageMax){
		groupPagerLinks = groupPagerLinks + '<li title="Aller à la page '+eval(page+1)+'" onclick="displayCommunityGroupsPage('+eval(page+1)+');return false;">Suivant</li>';
	}
	groupPagerLinks = groupPagerLinks + '</ul></div></td></tr>';
	if((page > 1) || (page < currentCommunityGroupsPageMax)){
		dojo.place(groupPagerLinks, dojo.query("#icxcommunitygrouppager")[0], "after");
	}
};

var displayCommunityGroups = function (data){
	var groupName = '';
	dojo.query(".communitygroup").forEach(dojo.destroy);
	var page = 1;
	currentCommunityGroupsPageMax = page;
	for(var i=1; i<data.length; i++){
		if(i != 1 && eval(i-1)%5 == 0){
			page++;
			currentCommunityGroupsPageMax = page;
		}
		console.log(data[i].groupName);
		groupName = '<tr class="communitygroup '+page+'"><td>'+data[i].groupName+'</td><td><a title="Supprimer le groupe '+data[i].groupName+'" onclick="removeCommunityGroup(\''+data[i].groupName+'\');return false;" href="#">Supprimer</a></td></tr>';
		dojo.place(groupName, dojo.query("#icxcommunitygrouplist")[0], "after");
	}
	displayLastSyncDate(data[0].date);
	displayCommunityGroupsPage(1);
};

var currentCommunityMembersPageMax = 1;

var displayCommunityMembersPage = function (page) {
	dojo.query(".communitymember").forEach(function(node){
		dojo.query(node).style("display", "none");		  
	});
	
	dojo.query(".communitymember."+page).forEach(function(node){
		dojo.query(node).style("display", "");		  
	});
	
	dojo.query(".communitymember.pager").forEach(dojo.destroy);
	var memberPagerLinks = '<tr class="communitymember pager"><td><div class="lotusPaging" id=""><ul class="lotusInlinelist lotusLeft">';
	if(page > 1){
		memberPagerLinks = memberPagerLinks + '<li class="lotusFirst" title="Aller à la page '+eval(page-1)+'" onclick="displayCommunityMembersPage('+eval(page-1)+');return false;">Précédent</li>';
	}
	if(page < currentCommunityMembersPageMax){
		memberPagerLinks = memberPagerLinks + '<li title="Aller à la page '+eval(page+1)+'" onclick="displayCommunityMembersPage('+eval(page+1)+');return false;">Suivant</li>';
	}
	memberPagerLinks = memberPagerLinks + '</ul></div></td></tr>';
	if((page > 1) || (page < currentCommunityMembersPageMax)){
		dojo.place(memberPagerLinks, dojo.query("#icxcommunitymemberpager")[0], "after");
	}
};

var displayCommunityMembers = function (data){
	var memberName = '';
	dojo.query(".communitymember").forEach(dojo.destroy);
	var page = 1;
	currentCommunityMembersPageMax = page;
	for(var i=1; i<data.length; i++){
		if(i != 1 && eval(i-1)%5 == 0){
			page++;
			currentCommunityMembersPageMax = page;
		}
		console.log(data[i].memberName);
		memberName = '<tr style="display:none" class="communitymember '+page+'"><td>'+data[i].memberName+'</td><td><a title="Supprimer le membre '+data[i].memberName+'" onclick="removeCommunityMember(\''+data[i].memberName+'\', \''+data[i].memberEmail+'\');return false;" href="#">Supprimer</a></td></tr>';
		dojo.place(memberName, dojo.query("#icxcommunitymemberlist")[0], "after");
	}
	displayLastSyncDate(data[0].date);
	displayCommunityMembersPage(1);
};

var ibmkey = "84ced955-2274-4684-9689-8291b159f8f9";

var removeCommunityGroup = function(groupName) {

	dojo.xhrGet({
		url : "https://edfx-ldc.edifixio-online.com:8443/ConnectionsCloud/RemoveGroup?communityUid="+currentCommunityUuid+"&groupName="+groupName,
		handleAs : "json",
		headers : {
			"Content-Type" : "application/json", "X-IBM-Token" : ibmkey
		},

		load : function(data) {
			displayCommunityGroups(data);
		},
		error : function(error) {
			console.log(error);
		}
	});
};

var removeCommunityMember = function(memberName, memberEmail) {

	dojo.xhrGet({
		url : "https://edfx-ldc.edifixio-online.com:8443/ConnectionsCloud/RemoveMember?communityUid="+currentCommunityUuid+"&memberName="+memberName+"&memberEmail="+memberEmail,
		handleAs : "json",
		headers : {
			"Content-Type" : "application/json", "X-IBM-Token" : ibmkey
		},

		load : function(data) {
			displayCommunityMembers(data);
		},
		error : function(error) {
			console.log(error);
		}
	});
};

var addCommunityGroup = function() {

	dojo.xhrGet({
		url : "https://edfx-ldc.edifixio-online.com:8443/ConnectionsCloud/AddGroup?communityUid="+currentCommunityUuid+"&groupName="+dojo.byId("dijiticxcommunitygroupadd").value,
		handleAs : "json",
		headers : {
			"Content-Type" : "application/json", "X-IBM-Token" : ibmkey
		},

		load : function(data) {
			if(data != null){
				displayCommunityGroups(data);
			}
		},
		error : function(error) {
			console.log(error);
		}
	});
};

var addCommunityMember = function() {

	dojo.xhrGet({
		url : "https://edfx-ldc.edifixio-online.com:8443/ConnectionsCloud/AddMember?communityUid="+currentCommunityUuid+"&memberName="+dojo.byId("icxcommunitymemberadd").membername+"&memberEmail="+dojo.byId("icxcommunitymemberadd").membermail,
		handleAs : "json",
		headers : {
			"Content-Type" : "application/json", "X-IBM-Token" : ibmkey
		},

		load : function(data) {
			if(data != null){
				displayCommunityMembers(data);
			}
		},
		error : function(error) {
			console.log(error);
		}
	});
};

var getCommunityGroups = function() {

	dojo.xhrGet({
		url : "https://edfx-ldc.edifixio-online.com:8443/ConnectionsCloud/GetGroups?communityUid="+currentCommunityUuid,
		handleAs : "json",
		headers : {
			"Content-Type" : "application/json", "X-IBM-Token" : ibmkey
		},

		load : function(data) {
			if(data != null){
				displayCommunityGroups(data);
			}
		},
		error : function(error) {
			console.log(error);
		}
	});
};

var getCommunityMembers = function() {

	dojo.xhrGet({
		url : "https://edfx-ldc.edifixio-online.com:8443/ConnectionsCloud/GetMembers?communityUid=b33aa70e-6298-41c1-900e-d560f36a61fd",
		handleAs : "json",
		headers : {
			"Content-Type" : "application/json", "X-IBM-Token" : ibmkey
		},

		load : function(data) {
			if(data != null){
				displayCommunityMembers(data);
			}
		},
		error : function(error) {
			console.log(error);
		}
	});
};

var memberstore;

var leaveMemberInput = function (){
	dojo.query(".jsonrestmember").forEach(dojo.destroy);
	dojo.query("#dijiticxcommunitymemberadd").style("display","none");
};

var addMemberInInput = function(membername, membermail){
	dojo.query("#icxcommunitymemberadd")[0].membername = membername;
	dojo.query("#icxcommunitymemberadd")[0].membermail = membermail;
	dojo.query("#icxcommunitymemberadd")[0].value = membername;
};

require(["dojo/store/JsonRest"], function(JsonRest){
	memberstore = new JsonRest({
		target: "https://apps.ce.collabserv.com/contacts/typeahead/people?contacts=true&users=true&groups=false&strict=true&intent=external"
	});
});

var changeMemberInput = function(){
	// Query for objects with options
	memberstore.query("&search_text="+dojo.byId("icxcommunitymemberadd").value, {
		start: 0,
		count: 10
	}).then(function(results){
		dojo.query(".jsonrestmember").forEach(dojo.destroy);
		dojo.query("#dijiticxcommunitymemberadd").style("display","");
		if(results != null){
			var i = 0;
			while(i<results.items.length){
				dojo.place("<div class=\"jsonrestmember dijitReset dijitMenuItem\" onclick=\"addMemberInInput('"+results.items[i].f+"','"+results.items[i].e+"')\">"+results.items[i].f+"</div>", dojo.query("#icxcommunitymemberinputlist")[0], "after");
				i = eval(i + 1);
			};
		}
	});
};
		
if(typeof(dojo) != "undefined") {
	require(["dijit/form/FilteringSelect", "dojo/data/ItemFileReadStore", "dijit/Dialog", "dijit/form/TextBox", "dijit/form/Button", "dojo/domReady!"], function(FilteringSelect, ItemFileReadStore) {
		 
		var waitFor = function(callback, elXpath, maxInter, waitTime) {
			if(!maxInter) var maxInter = 20;  // number of intervals before expiring
			if(!waitTime) var waitTime = 100;  // 1000=1 second
			if(!elXpath) return;

			var waitInter = 0;  // current interval
			var intId = setInterval(function() {
			  if (++waitInter < maxInter && !dojo.query(elXpath).length) return;
			  clearInterval(intId);
			  callback();
			}, waitTime);
		};
		
		var addGroupsLink = function() {
		
			if (!dojo.byId("manageGroups")) {
				var addGroups = '<div data-dojo-type="dijit/Dialog" data-dojo-id="myDialog" title="Name and Address" style="background: #FFFFFF; border-radius: 5px; padding: 10px !important; border: 1px solid black; width:400px">'+
									'<table><tr><td><h3>Gestion des groupes de la communauté <span id="icxcommunityname"></span></h3></td></tr>'+
										'<tr><td><div class="dijitDialogPaneActionBar"></div></td></tr>'+
										'<tr><td><table><tr><td>Ajout d\'un groupe</td><td><input id="icxcommunitygroupadd" type="text"></td><td><button id="icxcommunityadd" onclick="addCommunityGroup();return false;">Ajouter</button></td></tr></table></td></tr>'+
										'<tr><td><table><tr id="icxcommunitygrouplist"><td>Groupes membres de la communauté</td></tr></table>'+
										'<table><tr id="icxcommunitygrouppager"><td></td></tr></table></td></tr>'+
										'<tr><td><div class="dijitDialogPaneActionBar"></div></td></tr>'+
										'<tr><td><table><tr><td>Ajout d\'un membre</td><td>'+
										'<div class="dijit dijitReset dijitInline dijitLeft dijitTextBox dijitComboBox dijitValidationTextBox dijitTextBoxFocused dijitComboBoxFocused dijitValidationTextBoxFocused dijitFocused">'+
											'<div class="dijitReset dijitInputField dijitInputContainer">'+
												'<input id="icxcommunitymemberadd" oninput="changeMemberInput()" onfocus="this.value=\'\'" autocomplete="off" type="text" class="dijitReset dijitInputInner">'+
											'</div>'+
										'</div>'+
										'<div id="dijiticxcommunitymemberadd" class="dijitPopup dijitComboBoxMenuPopup" style="visibility: visible; z-index: 1000; height: auto; overflow: visible;" onmouseleave="leaveMemberInput()">'+
											'<div class="dijitReset dijitMenu dijitComboBoxMenu" style="overflow: hidden auto; top: 0px; visibility: visible; width: 180.4px;">'+
												'<div id="icxcommunitymemberinputlist"></div>'+
											'</div>'+
										'</div>'+
										'</td><td><button id="icxmemberadd" onclick="addCommunityMember();return false;">Ajouter</button></td></tr></table></td></tr>'+
										'<tr><td><table><tr id="icxcommunitymemberlist"><td>Membres de la communauté</td></tr></table>'+
										'<table><tr id="icxcommunitymemberpager"><td></td></tr></table></td></tr>'+
										'<tr><td><div class="dijitDialogPaneActionBar"></div></td></tr>'+
										'<tr><td><span>Date de la dernière synchronisation:&nbsp;</span><span id="icxsynchdate"></span></td></tr><tr><td><a onclick="myDialog.hide();return false;" href="#">Retour à Connections</a></td></tr>'+
									'</table>'+
								  '  <div class="dijitDialogPaneActionBar"></div>'+
								'</div>'+
								'<tr id="manageGroups" class="lotusFormFieldRow"> '+
									'<td><a onClick="myDialog.show();return false;" href="#">Gestion des membres</a></td>' +
								'</tr>';
				
				if (dojo.query("#addAllParentMembersRow") && dojo.query("#addAllParentMembersRow")[0]) {
					dojo.place(addGroups, dojo.query("#addAllParentMembersRow")[0], "before");
					
					require(["dojo/parser"], function(parser){
					  parser.parse();
					});
					
					getCommunityGroups();
					getCommunityMembers();
					
					var stateStore = new ItemFileReadStore({
				        url: "https://edfx-ldc.edifixio-online.com:8443/ConnectionsCloud/GetDominoGroups?ibmkey="+ibmkey
				    });

					var select = new FilteringSelect({
						name: "dijiticxcommunitygroupadd",
						id: "dijiticxcommunitygroupadd",
						placeHolder: "Select a Group",
						store: stateStore,
						searchAttr: "name"
					}, "icxcommunitygroupadd");
					select.startup();
				}				
			}
		};
		
		var renderMemberGroupCreateForm = function() {
			require(["dojo/aspect"], function(aspect) { 
				aspect.after(dojo,"displayMemberCreateForm", addGroupsLink(), true) 
			});			
		};
		
		function handleHashChangeEvent() {
			// Get the current hashValue
			var hashValue = window.location.hash;
			
			if (hashValue == "#fullpageWidgetId=Members") {
				waitFor(renderMemberGroupCreateForm, "#memberAddButtonLink");
			}
		}
		
		 //listen for onHashChange event
		window.onhashchange = handleHashChangeEvent;

		//set initial render member group create form
		handleHashChangeEvent();
	});	
}