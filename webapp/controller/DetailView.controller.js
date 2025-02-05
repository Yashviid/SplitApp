sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment"
], (Controller, Fragment) => {
    "use strict";

    return Controller.extend("app.splitappb12.controller.DetailView", {
        onInit() {
			var oModel=new sap.ui.model.json.JSONModel();
			oModel.loadData("/model/mockData/supplier.json");
			this.getView().setModel(oModel);


			let oRouter= this.getOwnerComponent().getRouter();
			oRouter.attachRoutePatternMatched(this._onRouteMatched,this)   //_onRouteMatched     private function
		},
		_onRouteMatched:function(oEvent){
			let sIndex=oEvent.getParameter("arguments").ind
			let sPath="toolModel>/data/"+sIndex
			//GET DETAIL VIEW OBJECT
			let oDetailView=this.getView();
			oDetailView.bindElement(sPath);
		},

		// //select from fragment
		onConfirm:function(oEvent){
			var oItem=oEvent.getParameter("selectedItem");
			var sItem=oItem.mProperties.title;
			
			var oInpt=sap.ui.getCore().byId(this.sId);
			oInpt.setValue(sItem);
		},
		
		f4Help:function(oEvent){
			this.sId=oEvent.getSource().getId();
       		var oView=this.getView();
       		var oModel = oView.getModel();
			// Deep copy
			 var oData = JSON.parse(JSON.stringify(oModel.getProperty("/supplierTab")));
 
			// Create a temporary model for the fragment
			var oTempModel = new sap.ui.model.json.JSONModel({
		 	supplierTab: oData
			 });
       	if(!this.dialog){
       		this.dialog=Fragment.load({
       			name:"app.splitappb12.fragments.popUp",
       			controller:this
       		}).then(function(oDialog){
       			this.dialog=oDialog;
       			oView.addDependent(this.dialog);
       			 this.dialog.setModel(oTempModel, "fragmentModel");
       			this.dialog.open();
       		}.bind(this));
       	}else{
       		this.dialog.open();
       	}
			
		
		}


        
    });
});