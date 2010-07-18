(function(){

function PendingOperation(successCB){

  var camID = "cam_"+Math.random().toString(36).substr(2);
  var cam = document.createElement('div');
  cam.id = camID;
  document.body.appendChild(cam);
  
  this.camID = camID;
  this.cam = cam;
  
  var has_permission = false;
  
  window.camID = function(encodedImage){
    if(!has_permission){
      successCB(["data:image/jpg;base64," + encodedImage]);
    }
    this.cancel();
  };

  var camOptions = new CamOptions();
  camOptions.framesPerSecond = 100;
  camOptions.displayVideo = "false";
  
  var camShim = new CamShim(camID, camID, camOptions); // create the flash camera interface
  
  
}

PendingOperation.prototype.cancel = function(){
  this.cam.innerHTML = '';
}

function Capture(){
  this.supportedImageFormats = [];
  this.supportedVideoFormats = [];
  this.supportedAudioFormats = [];
  
}

Capture.prototype.captureAudio = function(successCB, errorCB, options){
  errorCB('Not Implemented');
}

Capture.prototype.captureImage = function(successCB, errorCB, options){
  return new PendingOperation(successCB);
}

Capture.prototype.captureVideo = function(successCB, errorCB, options){
  errorCB('Not Implemented');
}

navigator.device = new Capture();

})()
