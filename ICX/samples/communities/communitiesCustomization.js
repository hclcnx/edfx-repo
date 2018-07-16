////
// @author Nicolas Lantheaume / EDIFIXIO
// @name Communities Customization
// @version 0.1
// @date May, 2018
//
if(typeof(dojo) != "undefined") {
	require(["dojo/domReady!"], function() {
		 
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
				var addGroups =ar addGroups = '<tr><td><div data-dojo-type="dijit/Dialog" data-dojo-id="myDialog" title="Name and Address">'+
									'<table class="dijitDialogPaneContentArea">'+
								      ' <tr>'+
								        '    <td><label for="name">Name:</label></td>'+
								          '  <td><input data-dojo-type="dijit/form/TextBox" name="name" id="name"></td>'+
								       ' </tr>'+
								       ' <tr>'+
								           ' <td><label for="address">Address:</label></td>'+
								          '  <td><input data-dojo-type="dijit/form/TextBox" name="address" id="address"></td>'+
								        '</tr>'+
								    '</table></div></td></tr>'+
									'<tr id="manageGroups" class="lotusFormFieldRow"> '+
									'<td width="130px" class="lotusFormLabel" style="padding-top: 10px;">Groupes :</td>' +
									'<td>' +
										'<table class="lotusTable" style="width: 650px;" cellpadding="0" cellspacing="0" border="0" role="presentation">' +
											'<tbody>' +
												'<tr><td><a onclick="javascript:myDialog.show();" href="#">Gérer les groupes Domino</a></td></tr>' +
											'</tbody>' +
										'</table>' +
									'</td>' +
									'<td width="50px" class="lotusFormLabel"/>' +
								'</tr>';
				if (dojo.query("#addAllParentMembersRow") && dojo.query("#addAllParentMembersRow")[0]) {
					dojo.place(addGroups,	dojo.query("#addAllParentMembersRow")[0],"before")
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