sap.ui.define([
    "sap/ui/core/mvc/Controller",
    //"app/splitappb12/model/models",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], (Controller,Filter,FilterOperator) => {
    "use strict";

    return Controller.extend("app.splitappb12.controller.ListItemsView", {
        onInit() {

        },


        onItemPress:function(oControlEvent){
			var item=oControlEvent.getParameter("listItem");
			var sPath=item.oBindingContexts.toolModel.sPath;
            let aItems=sPath.split("/")      // wanted last item i.e index from array so ondex no is 2
            let sIndex= aItems[aItems.length-1]
            let oRouter=this.getOwnerComponent().getRouter()
            oRouter.navTo("RouteDetail",{
                ind:sIndex
			})

			// var mainPath="toolModel>"+sPath;
			// var oApp=this.getObject(); //calling function from baseController
			
			// var oView2=oApp.getDetailPage("idDetail");
			// oView2.bindElement(mainPath);
			// this.onPressToView2(); // calling the function to navigate to next view
				//or we can just use 			
				//oApp.to("idDetail");
			
		},
		
		onSort:function(){
			//ascending and descending when we click alternately so we go with controller i.e this
			if(this.descending==="undefined"){
				this.descending=false;
			}
			var sorter=	new sap.ui.model.Sorter("name", this.descending);
			var oList=this.getView().byId("idListItem");
			var oBinding=oList.getBinding("items");
			oBinding.sort(sorter);
			this.descending=!this.descending; //flipping items i.e for ascending and dscending when we click sort button 
			
		},
		
		//in search field we need to acccess the values so we this function is used 
		onSearch:function(oEvent){
					var searchString= oEvent.getParameter("query") || oEvent.getParameter("newValue");
				//	var SearchST=this.getView().byId("idSearch").getValue(); 
												//operand opearator operand
					var filter1=new Filter("name", FilterOperator. Contains,searchString); //search through name
					var filter2 = new Filter("id",FilterOperator.Contains, searchString);  //search through id : for exact id we go with FilterOperator.EQ and FilterOperator.Contains
					var aFilter=[filter1,filter2];
					var mainFilter= new Filter({ // to search by both we go with this
						filters: aFilter,
						and:false
					});
					
					var oList=this.getView().byId("idListItem");
					var bindingItems=oList.getBinding("items");
					bindingItems.filter(mainFilter);
		},
		
		onPressToView2:function(){
			var oApp=this.getObject(); 
			oApp.to("idDetail");
		}
    });
});