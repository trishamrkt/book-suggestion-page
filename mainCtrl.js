app.config(function($routeProvider){
  $routeProvider
  .when("/", {
    templateUrl: "home.html"
  })
  .when("/bookInfo", {
    templateUrl: "bookinfo.html"
  })
  .when("/about", {
    templateUrl: "about.html"
  });
});

app.controller("mainCtrl", function($scope, $location, $http, $window) {
  $scope.title = "booklr";
  $scope.showMini = false;
  $scope.findBook = "";
  $scope.myExpression = function (book){
    return (book.Title !== $scope.book && book.Description === $scope.genre);
  }

  // Get data from MySQL database
  $http.get('http://localhost:9000/book_demo.php').then(function (response) {
    $scope.bookDemo = response.data.records;
  });

  // Performs search from user input
  function search(key){
    for (var i = 0; i < $scope.bookDemo.length; i++){
      if ($scope.bookDemo[i].Title.toLowerCase() === key.toLowerCase()){
        $scope.msg = "";
        $scope.author = $scope.bookDemo[i].Author;
        $scope.genre = $scope.bookDemo[i].Description;
        return;
      }
    }

    $scope.msg = "Sorry, book not found";
    $scope.author = "";
    return ("nothing");
  };
  // When user enters something into serach bar
  $scope.submit = function(findBook) {
    $scope.book = findBook;
    search(findBook);
    $location.path("/bookInfo");
    $scope.findBook = "";
  };

  // Toggles search bar in navigation bar
  $scope.showSearch = function() {
    $scope.showMini = !$scope.showMini;
    var elem = $window.document.getElementById('navisearch');
    elem.focus();
  }

  $scope.showSuggestions = function(search) {
    if (search !== "") {return true;}
    else {return false;}
  }

});
