////
// @author Nicolas Lantheaume / EDIFIXIO
// @name Communities Customization
// @version 0.1
// @date May, 2018
//
if(typeof(dojo) != "undefined") {
	require(["dijit/Dialog", "dijit/form/TextBox", "dijit/form/Button", "dojo/domReady!"], function() {
		 
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
		
		var getCommunityGroup = function(communityUid) {

			dojo.xhrGet({
				url : "https://edfx-nomad21:8443/ConnectionsCloud/GetGroups?communityUid="+communityUid,
				handleAs : "json",
				headers : {
					"Content-Type" : "application/json"
				},

				load : function(data) {
					var groupName = '';
					for(var i=1; i<data.length; i++){
						console.log(data[i].groupName);
						groupName = '<tr><td>'+data[i].groupName+'</td><td><a onclick="myDialog.hide();return false;" href="#">Supprimer</a></td></tr>';
						dojo.place(groupName, dojo.query("#icxcommunitygrouplist")[0], "after");
						
					}
				},
				error : function(error) {
					console.log(error);
				}
			});
		};
		
		var addGroupsLink = function() {
		
			if (!dojo.byId("manageGroups")) {
				var addGroups = '<div data-dojo-type="dijit/Dialog" data-dojo-id="myDialog" title="Name and Address" style="background: #FFFFFF; border-radius: 5px; padding: 10px !important; border: 1px solid black;">'+
									'<table><tr><td><h3>Gestion des groupes de la communauté <span id="icxcommunityname"></span></h3></td></tr>'+
										'<tr><td><table><tr><td>Ajout d un groupe</td></tr><tr><td>Groupe</td><td><input type="text"></td><td><button data-dojo-type="dijit/form/Button" type="submit" id="icxcommunityadd">Ajouter</button></td></tr></table></td></tr>'+
										'<tr><td><table><tr id="icxcommunitygrouplist"><td>Groupes membres de la communauté</td></tr>'+
										'</table></td></tr>'+
										'<tr><td><span>Date de la dernière synchronisation:&nbsp;</span><span id="icxsynchdate"></span></td></tr><tr><td><a onclick="myDialog.hide();return false;" href="#">Retour à Connections</a></td></tr>'+
									'</table>'+
						
								  '  <div class="dijitDialogPaneActionBar">'+
								       ' <button data-dojo-type="dijit/form/Button" type="submit" id="ok">OK</button>'+
								       ' <button data-dojo-type="dijit/form/Button" type="button" data-dojo-props="onClick:function(){myDialog.hide();}"  id="cancel">Cancel</button>'+
								    '</div>'+
								'</div>'+
								'<tr id="manageGroups" class="lotusFormFieldRow"> '+
									'<td width="130px" class="lotusFormLabel" style="padding-top: 10px;">Groupes :</td>' +
									'<td>' +
										'<table class="lotusTable" style="width: 650px;" cellpadding="0" cellspacing="0" border="0" role="presentation">' +
											'<tbody>' +
												'<tr><td><a onClick="myDialog.show();return false;" href="#">Gerer les groupes Dominos</a></td></tr>' +
											'</tbody>' +
										'</table>' +
									'</td>' +
									'<td width="50px" class="lotusFormLabel"/>' +
								'</tr>';
				if (dojo.query("#addAllParentMembersRow") && dojo.query("#addAllParentMembersRow")[0]) {
					dojo.place(addGroups, dojo.query("#addAllParentMembersRow")[0], "before");
					
					require(["dojo/parser"], function(parser){
					  parser.parse();
					});
					
					getCommunityGroup(currentCommunityUuid);
				}				
			}
		}
		
		
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