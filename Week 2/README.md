# Intelligent Sensor Networks

## Week 2 - Combining Front-End and Back-End

### 0. Prerequisites

We are assuming that you have followed our previous workshops and have a
basic understanding of how to make a Node/Express server. If not, you can follow the documentation from last week's workshop [here](https://github.com/rutgers/Intelligent-Sensor-Networks/tree/master/Week%201).

For this workshop, please have **MongoDB** installed on your laptops. You can download it [here](https://www.mongodb.com/download-center#community):

For Windows, after installation, there are some additional configuration steps.

1. Add `mongod` to your PATH environment variable so you can access the command from anywhere in the filesystem from the terminal. Go to `Control Panel -> System and Security -> System -> Advanced System Settings`. Go to the Advanced tab and click on "Environment Variables". Under System Variables, find "Path" and click "Edit...". Add the following to the variable: `C:\Program Files\MongoDB\Server\3.2\bin` (may be slightly different depending on the computer). Click "OK".
2. Add the following folder: `C:\data\db`

### 1. Our Web App Starter

To simplify development for future workshops, we have made a webapp starter available for your use. This includes an Express server with most of the basic middleware included to get started quickly with a web application. The folder structure looks like this:

```
client/                 # All our front end code goes here
--- index.html          # The front page of your web application
server/                 # All our back end code goes here
--- models/             # Our database models go here
------ grocery-item.js  # Grocery item model
--- routes/             # Our API routes go here
------ routes.js        # Grocery item API routes
--- server.js           # Our Node/Express server code
package.json            # Specify project details, dependencies, etc.
```

To test out this application, we need to install dependencies first. A quick `npm install` will do the trick!
Before we can test this, we need to have our MongoDB instance running. Open up a separate terminal and type `mongod`. We can run the server now on port 8080 by running `npm start`. Open up your browser and navigate to http://localhost:8080 and you should be greeted by **Rutgers ISN Team - Our Grocery List App!**.

### 2. Making our Grocery List App

Great! Now we have a working server with an actual webpage, but it's a little boring now. Let's turn it into a simple grocery list application, where you can add, edit, and delete grocery items.

Let's modify our `index.html` page to reflect this. We are going to make a custom HTML tag for our grocery list. We will show you how to do this with AngularJS. But for now, add the following line to your `index.html`.

```html
...

<h1 class="text-center">Rutgers ISN Team - Our Grocery List App!</h1>

<!-- GroceryList -->
<!-- <grocery-list></grocery-list> -->

...
```

That's it! Let's keep it commented for now until actual component is finished.

### 3. Intro to AngularJS

AngularJS is a MVC (model-view-controller) for creating dynamic, data-driven web applications. Think of it as an HTML "enhancer" of sorts. You can read more about Angular JS here.

We will start by defining the entry point of our AngularJS-enhanced web application. Add this to the top HTML tag of your `index.html` file:

```html
<html lang="en" ng-app="isn-grocery-list">
```
The `ng-app` directive tells that our webpage will be an AngularJS-enhanced, and our application name is `isn-grocery-list`. This is known as **bootstrapping** the Angular application.

Next, we are going to create some AngularJS files. First make a directory called `js` under client. Under `client/js/`, make a file called `app.module.js`. It should look like this:

```js
//app.module.js
//Author: Rutgers ISN Team

//Main app module, use this to load other submodules or third-party modules
angular.module("isn-grocery-list", []);
```

Notice how the app module name (the first argument to `angular.module`) is the same as the one we included in our HTML file. Within the brackets of the second paramter, we include our other user-defined submodules and third-party modules. We need to include the **UI Bootstrap** AngularJS code into our application, so modify the code to look like this:

```js
angular.module("isn-grocery-list", ["ui.bootstrap"]);
```

Great, but with every JS file that we make, we need to make sure to include it in our HTML file. So let's do that:

```html
...
<!-- Custom JS -->
<script src="js/app.module.js"></script>
...
```

If we double check our application in our browser, we should see that nothing has changed, and we should see no error in our browser console. That's good, because we haven't done anything too major. Now let's actually make the grocery list component.

### 4. The Grocery List Component

The first thing we want to do is create a submodule for our grocery list component. In AngularJS, it's considered good practice to have well-organized and modular code. So each module should have its own directory containing all the files associated with that component. Let's do that. Under `client/js`, make a directory called `grocery-list`. In that directory, make a file called `grocery-list.component.html`

The great thing about AngularJS and components is that you can define your own smaller HTML files that are associated to that component. This makes it easier to separate your HTML code into logical chunks.

We will start with adding this to our file:

```html
<div class="container-fluid">
    <div class="row">
        <div class="col-lg-8 col-lg-offset-2">
            <div class="panel panel-success">
                <div class="panel-heading">
                    <h1 class="text-center">Grocery List</h1>
                </div>
            </div>
        </div>
    </div>
</div>
```

This creates a centered header for us titled Grocery List. With this, we can start writing our JS code for the Grocery List component. In the same directory as the HTML snippet, make a file called `grocery-list.module.js`. Start off with this:

```js
//grocery-list.module.js
//Author: Rutgers ISN Team

angular.module("isn-grocery-list.grocery-list", []);
```

Notice how we title our submodule. We want to do it so it reflects a hierarchical relationship between modules. With this module declared, we need to
do two things: add it as a dependency to our `app.module.js` and add it to our `index.html` file.

**app.module.js**:

```js
angular.module("isn-grocery-list", ["isn-grocery-list.grocery-list", "ui.bootstrap"]);
```

**index.html**:

```html
...
<script src="js/grocery-list/grocery-list.module.js"></script>
...
```

Now, we can test the browser again to make sure that there are no errors. If so, we can start adding to our `grocery-list.module.js`:

```js
angular.module("isn-grocery-list.grocery-list", [])
    .component("groceryList", {
        templateUrl: "js/grocery-list/grocery-list.component.html",
        controller: GroceryListController
    })
    .factory("GroceryListService", GroceryListService);
```

On the module, we added two things: a component and a factory/service. A component is our small piece of HTML with our specified functionality and behavior given by the controller. The component name is given in `camelCase` and the corresponding HTML tag is created in `kebab-case`. We give the component a template URL pointing to our associated HTML template file (relative to the `index.html` file) and the function name of the controller.

A factory/service is mainly used to provide data that can be injected into other modules. Usually, the data is retrieved via HTTP or a database. The controller is responsible for controlling the display of that data to the user.

Let's start first with defining our GroceryListService function:

```js
...
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
...
```

The first line is a little strange. We are telling the GroceryList service that we
have the `$http` service (built-in AngularJS services are denoted with an "$" in the
beginning) as a dependency. This is not needed now, but later on when the JS code becomes minified
in a production environment, the service names can get mangled so this becomes a necessary step.

In our service, we return an object with four functions. These four functions mirror the four
route functions that we made earlier in our `routes.js` file.

Now let's make our GroceryListController function:

```js
...
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
...
```

Like we did in the GroceryListService, we explicitly injected the GroceryListService as a dependency for the GroceryListController.

We have a function `$onInit` that we use to initialize the component on load. We call upon the GroceryListService's function
to get the grocery items. The actual function returns not the items, but something called a Promise. It's a placeholder value that will eventually have the result upon success or failure. So we use the `.then()` function on the promise to resolve it in the case of success. We can also create another function to resolve in the case of error, but we omitted here for brevity. With the function, we make an HTTP GET request to the URL
and the resolve the promise to get the response data. The response returns all the grocery list items as JSON so we save that as the controller's values for `groceryList`. Similar logic follows with adding, editing, and deleting grocery items.

With all the functionality defined in our code, let's finish the `grocery-list.component.html` file:

```html
...
<ul class="list-group">
    <li class="list-group-item" ng-repeat="item in $ctrl.groceryList">
        <ul class="list-inline">
            <li>
                <h5>{{item.name}} ({{item.quantity}})</h5>
            </li>
            <li class="pull-right">
                <button class="btn btn-primary" ng-click="$ctrl.openEdit(item, $index)">Edit</button>
                <button class="btn btn-warning" ng-click="$ctrl.deleteGroceryItem(item, $index)">Delete</button>
            </li>
        </ul>
    </li>
</ul>
...
```

We are creating a list of our grocery items here. A couple key things to note. The `ng-repeat` directive tells us to repeat the
list element over all the items in `groceryList` and give each individual list element with the object `item`. We have to prepend each variable and function name associated with the controller with `$ctrl`. We can directly output our controller variables by using the `{{}}` notation. `ng-click` tells us to call that controller function when the button is clicked.

Let's add the last part to our file:

```html
<div class="panel-footer text-center" ng-hide="$ctrl.isEditing">
    <form class="form-inline">
        <div class="form-group">
            <label>Item name: </label>
            <input class="form-control"type="text" placeholder="Grocery item" ng-model="$ctrl.item.name">
        </div>
        <div class="form-group">
            <label>Quantity: </label>
            <input class="form-control"type="number" placeholder="Quantity" ng-model="$ctrl.item.quantity">
        </div>
        <button type="submit" class="btn btn-default" ng-click="$ctrl.addGroceryItem()">Add grocery item</button>
    </form>
</div>
```

The `ng-hide` tells us to hide the div whenever the expression evaluated to true. In this case, whenever we are editing an item, we will hide this
part of the page. `ng-model` provides two-way data binding. Whatever we type into the input gets bound to the variable value given and whatever we define as that variable value will become the value shown in the input. And `ng-click` is what we defined before.

Let's test out our web application now. Uncomment the `<grocery-list></grocery-list>` line in our `index.html` file. Run `npm start` and it should be up and running!
