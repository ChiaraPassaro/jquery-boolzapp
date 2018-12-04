var templateMessage = $('.template-message .message');

var buttonSubmit = $('.chat-bar__submit-a');

var inputChatbar = $('.chat-bar__input');

var wrapperMessage = $('.main__wrapper-messages');

//se clicco su bottone
buttonSubmit.click(function(){
  sendMessage();
  buttonSubmit.children('img').attr('src', 'img/mic.svg');
});

//se premo invio
inputChatbar.keyup(function(event){
  buttonSubmit.children('img').attr('src', 'img/send.svg');
  if(event.keyCode == 13)
  {
    sendMessage();
    buttonSubmit.children('img').attr('src', 'img/mic.svg');
  }
});

function sendMessage(){
  var input = $('.chat-bar__input input');
  var messageUserValue = input.val();
  var messageUserTemplate = templateMessage.clone();

  var time = addTime();
  messageUserTemplate.addClass('you');

  messageUserTemplate.find('.message__text').text(messageUserValue);
  messageUserTemplate.find('.date').text(time);

  wrapperMessage.append(messageUserTemplate);
  //svuoto input
  input.val('');

  var otherMessageTime = setTimeout(otherMessage, 1000);
}

function otherMessage(){
  var messageOtherTemplate = templateMessage.clone();
  var messageOtherValue = 'Ok';

  var time = addTime();
  messageOtherTemplate.addClass('other');

  messageOtherTemplate.find('.message__text').text(messageOtherValue);
  messageOtherTemplate.find('.date').text(time);
  wrapperMessage.append(messageOtherTemplate);
}

//funzione orario
function addTime(){
  var time = new Date();
  var hour = time.getHours() + ':' + addZero(time.getMinutes());
  return hour;
}

function addZero(number) {
    if (number < 10) {
        number = "0" + number;
    }
    return number;
}

//Cerco tra i contatti
var searchInput = $('.search-box__input input');
console.log(searchInput);

searchInput.keyup(function(){
  var listContact = $('.chat-list__items li .chat-list__name');
  var listaNomi = [];

  for (var i = 0; i < listContact.length; i++) {
    var contatto = $(listContact[i]);
    console.log('contatto' + contatto.text());
  }

});
