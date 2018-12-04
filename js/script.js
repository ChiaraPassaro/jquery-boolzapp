var templateMessage = $('.template-message .message');

var buttonSubmit = $('.chat-bar__submit-a');

var wrapperMessage = $('.main__wrapper-messages');

buttonSubmit.click(function(){
  var messageUserValue = $('.chat-bar__input input').val();
  var messageUserTemplate = templateMessage.clone();

  messageUserTemplate.addClass('you');
  messageUserTemplate.find('.message__text').text(messageUserValue);

  wrapperMessage.append(messageUserTemplate);

  var otherMessageTime = setTimeout(otherMessage, 1000);

});

function otherMessage(){
  var messageOtherTemplate = templateMessage.clone();
  var messageOtherValue = 'Ok';

  messageOtherTemplate.addClass('other');
  messageOtherTemplate.find('.message__text').text(messageOtherValue);

  wrapperMessage.append(messageOtherTemplate);
}
