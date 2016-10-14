//grocery-list.module.js
//Author: Rutgers ISN Team

angular.module("isn-grocery-list.grocery-list", [])
    .component("groceryList", {
        templateUrl: "js/grocery-list/grocery-list.component.html",
        controller: GroceryListController
    })
    .factory("GroceryListService", GroceryListService);

GroceryListController.$inject = ["GroceryListService"];

function GroceryListController(GroceryListService) {
    var vm = this;

    vm.isEditing = false;
    vm.item = null;
    vm.editedItem = null;
    vm.index = null;

    //Initialize grocery list
    vm.$onInit = function() {
        getGroceryList()
            .then(function(res) {
                vm.groceryList = res.data;
            });
    };

    vm.openEdit = function(item, index) {
        vm.isEditing = !vm.isEditing;
        vm.editedItem = angular.copy(item);
        vm.index = index;
    };

    vm.closeEdit = function() {
        vm.isEditing = !vm.isEditing;
        vm.editedItem = null;
        vm.index = null;
    };

    vm.addGroceryItem = function() {
        GroceryListService.addGroceryItem(vm.item)
            .then(function(res) {
                vm.groceryList.push(res.data);
                vm.item.name = "";
                vm.item.quantity = "";
            });
    };

    vm.editGroceryItem = function(item) {
        GroceryListService.editGroceryItem(item, vm.index)
            .then(function(res) {
                vm.groceryList[vm.index] = item;
                vm.closeEdit();
            });
    };

    vm.deleteGroceryItem = function(item, index) {
        GroceryListService.deleteGroceryItem(item, index)
            .then(function(res) {
                vm.groceryList.splice(index, 1);
            });
    };

    function getGroceryList() {
        return GroceryListService.getGroceryList();
    }

}

GroceryListService.$inject = ["$http"];

function GroceryListService($http) {
    return {
        getGroceryList: getGroceryList,
        addGroceryItem: addGroceryItem,
        editGroceryItem: editGroceryItem,
        deleteGroceryItem: deleteGroceryItem
    };

    function getGroceryList() {
        return $http.get("/api/grocery-items");
    }

    function addGroceryItem(item) {
        return $http.post("/api/grocery-items", item);
    }

    function editGroceryItem(item) {
        return $http.put("/api/grocery-items/" + item._id, item);
    }

    function deleteGroceryItem(item) {
        return $http.delete("/api/grocery-items/" + item._id);
    }
}
