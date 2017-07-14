app.config(function($routeProvider){
  $routeProvider
  .when("/", {
    templateUrl: "home.html"
  })
  .when("/bookInfo", {
    templateUrl: "bookinfo.html"
  })
  .when("/about", {
    templateUrl: "about.html",
    controller: "aboutCtrl"
  })
  .when("/favourites", {
    templateUrl: "favourites.html"
  });
});

app.controller("mainCtrl", function($scope, $location, $http, $window, $filter) {
  $scope.title = "booklr";
  $scope.showMini = false;  // Used to toggle navi search bar
  $scope.findBook = "";     // Search key
  $scope.favourites = [];      // Users saved books

  // Expression to filter out book recommendations
  // based on genre
  $scope.myExpression = function (book){
    return (book.Title.toLowerCase() !== $scope.book.toLowerCase() && book.Description === $scope.genre);
  }

  $scope.anotherExpression = function (book) {
    for (var i = 0; i < $scope.favourites.length; i++){
      if ($scope.favourites[i].Title.toLowerCase() === book.Title.toLowerCase()){
        return true;
      }
    }
    return false;
  };

  // Get data from MySQL database
  $http.get('http://localhost:9000/book_demo.php').then(function (response) {
    $scope.bookDemo = response.data.records;
  });

  // Performs search from user input
  function search(key){
    // Searches for book
    for (var i = 0; i < $scope.bookDemo.length; i++){
      if ($scope.bookDemo[i].Title.toLowerCase() === key.toLowerCase()){
        $scope.msg = "";
        $scope.author = $scope.bookDemo[i].Author;
        $scope.genre = $scope.bookDemo[i].Description;
        return;
      }
    }

    // if book not found
    $scope.msg = "Sorry, book not found";
    $scope.author = "";
    $scope.genre = "";
    return;
  };

  // When user searches for something
  $scope.submit = function(findBook) {
    $scope.book = findBook;
    search(findBook);
    $location.path("/bookInfo");
    $scope.findBook = "";
  };

  // Toggles search bar in navigation bar
  $scope.showSearch = function() {
    $scope.showMini = !$scope.showMini;
  };

  // Shows suggestions for search bar
  $scope.showSuggestions = function(search) {
    if (search !== "") {return true;}
    else {return false;}
  };

  // Add to favourite list
  $scope.favourite = function(index, title) {
    var check = $filter('filter')($scope.favourites, {Title : title});
    if (check.length !== 0) {
      var id = $scope.favourites.map(function(x) {return x.Title; }).indexOf(title);
      $scope.favourites.splice(id, 1);
    }
    else {
      var temp = $filter('filter')($scope.bookDemo, $scope.myExpression);
      $scope.favourites.push(temp[index]);
    }
  }

  $scope.unlike = function (index) {
    $scope.favourites.splice(index, 1);
  }

  // Go to amazon page
  $scope.goToAmz = function(isbn) {
    var url = "https://amazon.ca/dp/"
    $window.open(url + isbn);
  };

  // Go to chapters page
  $scope.goToChpt = function(isbn) {
    url = "https://m.indigo.ca/product/books/title/";
    $window.open(url + isbn);
  }

});
