var templateMessage = $('.template-message .message');

var buttonSubmit = $('.chat-bar__submit-a');

var inputChatbar = $('.chat-bar__input');

var wrapperMessage = $('.main__wrapper-messages');

//se clicco su bottone
buttonSubmit.click(function(){
  sendMessage('you');
  buttonSubmit.children('img').attr('src', 'img/mic.svg');
});

//se premo invio
inputChatbar.keyup(function(event){
  buttonSubmit.children('img').attr('src', 'img/send.svg');
  if(event.keyCode == 13)
  {
    sendMessage('you');
    buttonSubmit.children('img').attr('src', 'img/mic.svg');
  }
});

//Funzione invio messaggio
function sendMessage(sender){
  var input = $('.chat-bar__input input');

  var messageUserTemplate = templateMessage.clone();

  var time = addTime();
  messageUserTemplate.addClass(sender);

  if(sender == 'you'){
    var messageUserValue = input.val();
  } else {
    var messageUserValue = 'ok';
  }

  messageUserTemplate.find('.message__text').text(messageUserValue);
  messageUserTemplate.find('.date').text(time);

  wrapperMessage.append(messageUserTemplate);
  //svuoto input
  input.val('');

  if(sender == 'you'){
    console.log(sender);
    sender = 'other';
    var otherMessageTime = setTimeout(sendMessage, 1000);
  }

}

// function otherMessage(){
//   var messageOtherTemplate = templateMessage.clone();
//   var messageOtherValue = 'Ok';
//
//   var time = addTime();
//   messageOtherTemplate.addClass('other');
//
//   messageOtherTemplate.find('.message__text').text(messageOtherValue);
//   messageOtherTemplate.find('.date').text(time);
//   wrapperMessage.append(messageOtherTemplate);
// }

//funzione orario
function addTime(){
  var time = new Date();
  var hour = time.getHours() + ':' + addZero(time.getMinutes());
  return hour;
}
//funzione aggiungi zero a numero inferiore di 10
function addZero(number) {
    if (number < 10) {
        number = "0" + number;
    }
    return number;
}

//Cerco tra i contatti
var searchInput = $('.search-box__input input');

searchInput.keyup(function(){
  var listContact = $('.chat-list__items li');
  var listContactName = $('.chat-list__items li .chat-list__name');

  $(listContact).removeClass('hidden');

  listContactName.each(function(){
    var liParent = $(this).parents('.chat-list__item');
    var thisText = $(this).text().toLowerCase();
    var userText = searchInput.val().toLowerCase();

    console.log(thisText.indexOf(userText));
    if(thisText.indexOf(userText) == -1){
      $(liParent).addClass('hidden');
    }
  });

});

addChats();
function addChats (){
  var wrapperChatList = $('.chat-list__items');
  var templateItems = [];
  //per ogni utente nell'array
  for (var i = 0; i < arrayChats.length; i++) {
    var templateItem = $('.chat-list__item').clone();
    var thisElement = arrayChats[i];


    //per ogni chiave in questo elemento
    for (var key in thisElement) {
      //id utente
      var idUser = key;
      console.log(idUser);

      templateItem.attr('id', idUser);

      var name = thisElement[idUser].name;
      templateItem.find('.chat-list__name').text(name);

      var messages = thisElement[idUser].messages;

      //ciclo su tutti i messaggi
      var counter = 0;
      while (counter < messages.length){
        // console.log(messages[counter]);
        for (var key2 in messages[counter]) {
          //console.log(key2);
          if(key2 == 'from'){
            var from = messages[counter][key2];
            // console.log(from);
          }
          else if(key2 == 'text'){
            var text = messages[counter][key2];
            // console.log(text);
          }
          else if (key2 == 'time'){
            var time = messages[counter][key2];
            // console.log(time);
          }
          //metto l'ultimo messaggio in chat-list
          if(counter == messages.length - 1){
            templateItem.find('.chat-list__message').text(text);
            templateItem.find('.chat-list__date').text(time);
          }
        }
        counter++;
      }
    }
    templateItems.push(templateItem);
  }
  wrapperChatList.append(templateItems);
}
