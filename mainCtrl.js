app.config(function($routeProvider){
  $routeProvider
  .when("/", {
    templateUrl: "home.html"
  })
  .when("/bookInfo", {
    templateUrl: "bookinfo.html"
  });
});

app.controller("mainCtrl", function($scope, $location) {
  $scope.books ={"harry potter" : "jk rowling", "the book thief" : "markus zusak"};
  $scope.title = "booklr";

  function search(key){
    if ($scope.books[key] === undefined)
      {$scope.msg = "Sorry, book not found";}
    else {
      $scope.msg = "author: " + $scope.books[key];
    }
  };

  $scope.submit = function(findBook) {
    $scope.book = findBook;
    search(findBook);
    $location.path("/bookInfo");
  };

});
