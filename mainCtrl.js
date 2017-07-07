app.config(function($routeProvider){
  $routeProvider
  .when("/", {
    templateUrl: "home.html"
  })
  .when("/bookInfo", {
    templateUrl: "bookinfo.html"
  });
});

app.controller("mainCtrl", function($scope, $location, $http) {
  $scope.books ={"harry potter" : "jk rowling", "the book thief" : "markus zusak"};
  $scope.title = "booklr";
  $scope.showMini = false;

  $http.get('http://localhost:9000/book_demo.php').then(function (response) {
    $scope.bookDemo = response.data.records;
  });

  function search(key){
    if ($scope.books[key] === undefined){
      $scope.msg = "Sorry, book not found";
      $scope.booktitle = "";
      $scope.author = "";
    }
    else {
      $scope.msg = "Showing results for " + key;
      $scope.booktitle = "title: " + key;
      $scope.author = "author: " + $scope.books[key];
    }
  };

  $scope.submit = function(findBook) {
    $scope.book = findBook;
    search(findBook);
    $location.path("/bookInfo");
    $scope.findBook = "";
  };

  $scope.showSearch = function() {
    $scope.showMini = !$scope.showMini;
  }

});
