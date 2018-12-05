var templateMessage = $('.template-message .message');

var buttonSubmit = $('.chat-bar__submit-a');

var inputChatbar = $('.chat-bar__input');

$(document).ready(function(){
  var chats = addChats();
  //se clicco su bottone
  buttonSubmit.click(function(){
    var list = chats[0];
    var idUser = $(list).children('.active').attr('id');
    console.log(idUser);
    sendMessage('you', idUser);
    buttonSubmit.children('img').attr('src', 'img/mic.svg');
  });

  //se premo invio
  inputChatbar.keyup(function(event){
    buttonSubmit.children('img').attr('src', 'img/send.svg');
    if(event.keyCode == 13)
    {
      var list = chats[0];
      var idUser = $(list).children('.active').attr('id');
      console.log(idUser);
      sendMessage('you', idUser);
      buttonSubmit.children('img').attr('src', 'img/mic.svg');
    }
  });

});


//Funzione invio messaggio
function sendMessage(sender, idUser){
  var sender = sender;
  var idUser = idUser;
  console.log('sender ' + sender);

  var wrapperMessage = $('#'+idUser+'-messages');
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
    sender = 'other';
    idUser = idUser;
    console.log('other ' + idUser);
    var otherMessageTime = setTimeout(sendMessage,1000,sender,idUser);
      // function(){
      //   sendMessage(sender, idUser);
      // }, 1000);
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


function addChats (){
  var mainContent = $('.main__content');
  var wrapperChatList = $('.chat-list__items');
  var templateItems = [];
  var templateMessages = [];

  //per ogni utente nell'array
  for (var i = 0; i < arrayChats.length; i++) {
    var templateItem = $('.chat-list__item').clone();
    var thisElement = arrayChats[i];
    var wrapperMessage = $('.main__wrapper-messages').clone();

    //per ogni chiave in questo elemento
    for (var key in thisElement) {
      //id utente
      var idUser = key;
      wrapperMessage.attr('id', idUser + '-messages');
      console.log(wrapperMessage);

      //console.log(idUser);

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

        //creo i messaggi
        var messageUserTemplate = templateMessage.clone();

        var time = addTime();
        messageUserTemplate.addClass(from);


        messageUserTemplate.find('.message__text').text(text);
        messageUserTemplate.find('.date').text(time);

        wrapperMessage.append(messageUserTemplate);
        counter++;
      }

    }
    //metto active alla prima
    if(i == 0){
      templateItem.addClass('active');
      wrapperMessage.addClass('active');
    }
    templateMessages.push(wrapperMessage);
    templateItems.push(templateItem);
  }
  mainContent.prepend(templateMessages);
  wrapperChatList.append(templateItems);

  //ritorno gli oggetti creati nella pagina
  var chatlist = wrapperChatList;
  var messagelist = mainContent.find('.message__wrapper');

  var objects = [chatlist, messagelist];
  return objects;
}
