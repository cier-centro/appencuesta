// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordova'])

        .run(function ($ionicPlatform) {
            $ionicPlatform.ready(function () {
                if (window.cordova && window.cordova.plugins.Keyboard) {
                    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                    // for form inputs)
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

                    // Don't remove this line unless you know what you are doing. It stops the viewport
                    // from snapping when text inputs are focused. Ionic handles this internally for
                    // a much nicer keyboard experience.
                    cordova.plugins.Keyboard.disableScroll(true);
                }
                if (window.StatusBar) {
                    StatusBar.styleDefault();
                }
            });
        })
        .controller("ExampleController", function ($scope, $cordovaCamera, $ionicLoading, $cordovaFile) {
            $scope.data = {nombre: "", apellidos: "", telefono: "", direccion: ""}

            $scope.takePhoto = function () {
                var options = {
                    quality: 75,
                    destinationType: Camera.DestinationType.FILE_URI,
                    sourceType: Camera.PictureSourceType.CAMERA,
                    allowEdit: true,
                    encodingType: Camera.EncodingType.JPEG,
                    targetWidth: 300,
                    targetHeight: 300,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: false
                };
                $cordovaCamera.getPicture(options).then(function (imageData) {                    
                    $scope.imgURI = imageData;
                    $scope.sourceDirectory = imageData.substring(0, imageData.lastIndexOf('/') + 1);
                    $scope.sourceFileName = imageData.substring(imageData.lastIndexOf('/') + 1, imageData.length);
                    $scope.imageData = imageData;
                }, function (err) {
                    // An error occured. Show a message to the user
                });
            }

            $scope.choosePhoto = function () {
                var options = {
                    quality: 75,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                    allowEdit: true,
                    encodingType: Camera.EncodingType.JPEG,
                    targetWidth: 300,
                    targetHeight: 300,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: false
                };
                $cordovaCamera.getPicture(options).then(function (imageData) {
                    $scope.imgURI = imageData;
                    $scope.imageData=imageData;
                }, function (err) {
                    // An error occured. Show a message to the user
                });
            }
            $scope.saveData = function () {
                $ionicLoading.show({
                    template: 'saving...'
                });
                
                $cordovaFile.writeFile(cordova.file.externalDataDirectory, $scope.data.nombre+" "+$scope.data.apellidos+"_data.txt", JSON.stringify($scope.data))
                    .then(function (success) {
                      $ionicLoading.hide()
                        $scope.data = {nombre: "", apellidos: "", telefono: "", direccion: ""}
                        
                    }, function (error) {
                      alert(error)
                });  
                
                $cordovaFile.copyFile($scope.sourceDirectory, $scope.sourceFileName, cordova.file.externalDataDirectory,$scope.data.nombre+" "+$scope.data.apellidos+"_picture.jpg")
                    .then(function (success) {
                      $ionicLoading.hide()
                      $scope.imgURI = ""
                    }, function (error) {
                      alert(error)
                }); 
                
                    
            };
        })
