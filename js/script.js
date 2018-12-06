var templateMessage = $('.template-message .message');

var buttonSubmit = $('.chat-bar__submit-a');

var inputChatbar = $('.chat-bar__input');

var templateMessageDropdown = $('.template-message__dropdown .message__dropdown-menu');

$(document).ready(function(){
  var chats = addChats();
  var list = chats[0];
  var main = chats[1];
  var li = $(list).children('li');
  var avatar = $('.main .header .avatar__img');
  var name = $('.main .header__info-name');
  var status = $('.main .header__info-status');
  var statusArray = ['online', 'offline'];

  $(li).click(function(){
    var thisLi = $(this);
    var thisName = thisLi.find('.chat-list__name').text();
    var srcAvatar = thisLi.find('.avatar__img').attr('src');
    console.log(srcAvatar);
    var id = $(this).attr('id');
    var idMessageWrapper = '#' + id + '-messages';
    var thisMessageWrapper = $(main).find(idMessageWrapper);
    li.removeClass('active');
    thisLi.addClass('active');
    main.find('.main__wrapper-messages').removeClass('active');
    thisMessageWrapper.addClass('active');
    avatar.attr('src', srcAvatar);
    name.text(thisName);
    var numRandom = getRandom(0,1);
    //console.log(numRandom);
    var thisStatus = statusArray[numRandom];
    status.text(thisStatus);
    linksMessage();
  });

  //se clicco su bottone
  buttonSubmit.click(function(){
    var idUser = $(list).children('.active').attr('id');
    console.log(idUser);
    sendMessage('you', idUser, linksMessage);
    buttonSubmit.children('img').attr('src', 'img/mic.svg');
  });

  //se premo invio
  inputChatbar.keyup(function(event){
    buttonSubmit.children('img').attr('src', 'img/send.svg');
    if(event.keyCode == 13)
    {
      var idUser = $(list).children('.active').attr('id');
      console.log(idUser);
      sendMessage('you', idUser, linksMessage);
      buttonSubmit.children('img').attr('src', 'img/mic.svg');
    }
  });


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


});


//Funzione invio messaggio
function sendMessage(sender, idUser, callback){
  var sender = sender;
  var idUser = idUser;
  console.log('la funzione');
  console.log(callback);
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

  //se è stata passata una funzione callback la richiamo
  if (callback && typeof callback === 'function') {
    callback();
  }

  if(sender == 'you'){
    sender = 'other';
    idUser = idUser;
    console.log('other ' + idUser);
    var otherMessageTime = setTimeout(sendMessage,1000,sender,idUser, callback);
      // function(){
      //   sendMessage(sender, idUser);
      // }, 1000);
  }


}

//Funzione che aggiunge le chat carcandole da un file js
function addChats (){
  var mainContent = $('.main__content');
  var wrapperChatList = $('.chat-list__items');
  var templateItems = [];
  var templateMessages = [];

  //per ogni utente nell'array
  for (var i = 0; i < arrayChats.length; i++) {
    var templateItem = $('.chat-list__item').clone();
    var thisElement = arrayChats[i];
    var wrapperMessage = $('.main__wrapper-messages').clone().removeClass('template');

    //per ogni chiave in questo elemento
    for (var key in thisElement) {
      //id utente
      var idUser = key;
      wrapperMessage.attr('id', idUser + '-messages');
      //console.log(wrapperMessage);

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
        var messageDropdown = templateMessageDropdown.clone();

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
  var main = $('.main');
  var objects = [chatlist, main, messagelist];
  linksMessage();
  return objects;
}


//Funzione se clicco sui link dei messaggi

function linksMessage(){
  var linkMessage = $('.main__wrapper-messages.active .message__link');

  linkMessage.off('click').on('click',function(event){ //resetto il click per non duplicarlo
    event.preventDefault();
    var thisCaret = $(this);
    var thisMessage = $(this).parents('.message');
    var thisMessageWrapper = $(this).parents('.message__wrapper');
    var thisLinkMenu = templateMessageDropdown.clone();
    var deleteLink = thisLinkMenu.find('.message__delete');

    deleteLink.click(function(){
      thisMessage.remove();
    });

    //controllo se è già stato inserito il menu
    var drop =  thisMessage.find('.message__dropdown-menu');

    if(drop.length){
      drop.remove();
      $('.message').removeClass('zindex-100');
    }else{
      $('.message__dropdown-menu').remove();
      $('.message').removeClass('zindex-100');
      thisMessage.addClass('zindex-100');

      //non visibile
      thisLinkMenu.css('opacity', '0');
      thisMessageWrapper.append(thisLinkMenu);

      //calcolo la posizione se left  è un numero negativo lo sposto
      var linkMenuPosition = thisLinkMenu.position();
      var caretPosition = thisCaret.position();
      var thisDropWidth = thisLinkMenu.width();

      if (linkMenuPosition.left < 0 && thisMessage.hasClass('other')){
        var calcRight = -(thisDropWidth + caretPosition.left);
        thisLinkMenu.css('right', calcRight);
      }

      //faccio comparire i link
      thisLinkMenu.css('opacity', '1');
    }
  });
}
