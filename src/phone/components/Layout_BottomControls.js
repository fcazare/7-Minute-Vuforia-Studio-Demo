console.log($scope.app);

//Open/Close Menu
$scope.menuClicked = function() {
  if ($scope.view.wdg['popup-menu'].visible == false) {
    $scope.app.fn.triggerWidgetService('popup-menu', 'showpopup');
    $scope.view.wdg['image-menu'].imgsrc = "app/resources/Uploaded/close_gray.svg";
    $scope.view.wdg['image-menu'].class = 'close_button';
  }
  else {
    $scope.app.fn.triggerWidgetService('popup-menu', 'hidepopup');
    $scope.view.wdg['image-menu'].imgsrc = "app/resources/Uploaded/menu_gray.svg";
    $scope.view.wdg['image-menu'].class = 'menu_button';
  }
}

//Close all open popups and make pingers visible again
$scope.closeAllPopups = function() {
  wdgs=$scope.view.wdg
  Object.keys(wdgs).forEach(function(key) {
    wdg = wdgs[key]
    console.warn(wdg)
    if ( (('type' in wdg)==true) && ((wdg.type=='floatingpopup') || (wdg.type=='modal'))) {
      console.warn("POPUP=>modelWdgReset key="+key)
      $scope.app.fn.triggerWidgetService(key,'hidepopup');
    }
  });
  $scope.$applyAsync();
  $scope.view.wdg['image-menu'].imgsrc = "app/resources/Uploaded/menu_gray.svg";
  $scope.view.wdg['image-menu'].class = 'menu_button';
  $scope.view.wdg['3DImage_pinger_1'].visible = true;
}

//Hides images and shows step popup(s)
$scope.pingerClicked = function() {
  $scope.app.fn.triggerWidgetService('popup-controls', 'showpopup');
  $scope.app.fn.triggerWidgetService('popup-steps', 'showpopup');
  $scope.app.fn.triggerWidgetService('popup-refresh', 'showpopup');
  $scope.view.wdg['3DImage_pinger_1'].visible = false;
  $scope.view.wdg['3DLabelBackground_white'].visible = false;
  $scope.view.wdg['3DLabel_black'].visible = false;
  $scope.view.wdg['3DLabelBackground_black'].visible = false;
  $scope.view.wdg['3DLabel_white'].visible = false;
}

//Grey out buttons when sequence is being played
$scope.playStarted = function() {
  $scope.view.wdg['image-previous'].class = 'controls_button gray';
  $scope.view.wdg['image-refresh'].class = 'controls_button gray';
  $scope.view.wdg['image-next'].class = 'controls_button gray';
}

//Return buttons to color when a sequence is no longer playing
$scope.playStopped = function() {
  $scope.view.wdg['image-previous'].class = 'controls_button';
  $scope.view.wdg['image-refresh'].class = 'controls_button';
  $scope.view.wdg['image-next'].class = 'controls_button';
}

//Get Step Label from model
$scope.$on('newStep', function(evt, arg) {
  $scope.view.wdg['label-steps'].text = arg;
});

//Pinger Shader
$timeout(function() {
  $scope.view.wdg['3DImage_pinger_1'].shader = "pinger;rings f 5;rate f 10;direction f -1;r f 1;g f 1;b f 0";
},1000);

$scope.exitSequence = function() {
  $scope.closeAllPopups();
  $scope.view.wdg['3DImage_pinger_1'].visible = true;
  $scope.view.wdg['3DLabelBackground_white'].visible = true;
  $scope.view.wdg['3DLabel_black'].visible = true;
  $scope.view.wdg['3DLabelBackground_black'].visible = true;
  $scope.view.wdg['3DLabel_white'].visible = true;
}

//Time functions
$scope.getTime = function() {
   var str = "";
   var currentTime = new Date()
   var hours = currentTime.getHours()
   var minutes = currentTime.getMinutes()
   var seconds = currentTime.getSeconds()
   if (minutes < 10) {
     minutes = "0" + minutes
   }
   if (seconds < 10) {
     seconds = "0" + seconds
   }
   str += hours + ":" + minutes + ":" + seconds + " ";
   if (hours > 11) {
     str += "PM"
   }
   else {
     str += "AM"
   }
  return str;
}
$scope.getDate = function() {
   var str = "";
   var currentDate = new Date()
   var year = currentDate.getFullYear()
   var month = currentDate.getMonth() + 1
   var day = currentDate.getDate()
 
   str += month + "/" + day + "/" + year;
  
   return str;
}
