app.controller('aboutCtrl', function($scope, $interval){
  $scope.currentID = 0;
  $scope.headings = [
    { Heading: "booklr",
      Desc: "something something something something something"},
    { Heading: "search",
      Desc: "Enter a title in the search bar and choose the closest match"
    },
    { Heading: "suggestions",
      Desc: "booklr will give you a list of book recommendations to read next based on similar genres"
    },
    { Heading: "favourites",
      Desc: "you can choose the books to save and view them in the favourites tab"
    },
    { Heading: "done!",
      Desc: "get a link to buy your books online and then you're done"
    }];

    $interval(function () {
      if ($scope.currentID === 4)
        $scope.currentID = 0;
      else $scope.currentID++;
    }, 4000);

  $scope.isCurrentID = function (index) {
    return ($scope.currentID === index);
  };

  $scope.prevSlide = function (index) {
    if (index === 0) { return; }
    else {
      $scope.currentID = index - 1;
    }
  }

  $scope.nextSlide = function (index) {
    if (index === 4) {
      $scope.currentID = 0;
    }
    else {
      $scope.currentID = index + 1;
    }
  }

});
