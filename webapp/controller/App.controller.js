sap.ui.define([
  "sap/ui/core/mvc/Controller"
], (BaseController) => {
  "use strict";

  return BaseController.extend("app.splitappb12.controller.App", {
      onInit() {

        // var oModel= new sap.ui.model.json.JSONModel()
        // oModel.loadData("/model/mockData/toolsData.json"); //slash is required in the begining in btp
		    // this.getView().setModel(oModel,"toolModel");

      }
  });
});