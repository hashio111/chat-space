$(function() {
  function buildMessage(message) {
    var image = message.image ? `<img class="lower-message__image" src="${message.image}">` : '';
    var html = `<div class="chat-main__messages__box" data-message-id="${message.id}">
                  <div class="chat-main__messages__upper-message">
                    <div class="chat-main__messages__upper-message__user-name">
                    ${message.user_name}
                    </div>
                  <div class="chat-main__messages__upper-message__date">
                    ${message.created_at}
                  </div>
                  </div>
                <div class="chat-main__messages__lower-message">
                  <p class="chat-main__messages__lower-message__content">
                  ${message.content}
                  </p>
                ${image}
                  </div>
                </div>`;
    return html;
  }


  $("#new_message").on("submit", function (e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr("action");
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: "json",
      processData: false,
      contentType: false
    })
      .done(function (message) {
        var html = buildMessage(message);
        $(".chat-main__messages").append(html);
        $(".chat-main__messages").animate({scrollTop: $(".chat-main__messages")[0].scrollHeight});
        $("#new_message")[0].reset();
        $(".form__submit").prop("disabled", false);
      })
      .fail(function () {
        alert("メッセージか画像を入力してください");
        $(".form__submit").prop("disabled", false);
      })
  })


  var reloadMessages = function() {
    var group_id = $(".chat-main__main-header__left-box__group-name").data("group-id");
    var last_message_id = $(".chat-main__messages__box").last().data("message-id");
    $.ajax({
      url: `/groups/${group_id}/api/messages`,
      type: "GET",
      dataType: "json",
      data: {id: last_message_id}
    })
    .done(function(messages) {
      messages.forEach(function(message) {
        var insertHTML = buildMessage(message);
        $(".chat-main__messages").append(insertHTML);
        $(".chat-main__messages").animate({scrollTop: $(".chat-main__messages")[0].scrollHeight});
      })
    })
    .fail(function() {
      alert('自動更新に失敗しました');
    })
  }

  var interval = setInterval(function() {
    if (location.href.match(/\/groups\/\d+\/messages/)){
      reloadMessages();
    } else {
      clearInterval(interval);
    }
  }, 5000);
});