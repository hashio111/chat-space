$(function () {

  function buildMessage(message) {
    var image = "";
    if (message.image) {
      image = `<img class="lower-message__image" src="${message.image}">`
    }
    var html = `<div class="chat-main__messages__upper-message">
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
        $("#message_content").val("");
        $(".form__submit").prop("disabled", false);
        $(".chat-main__messages").animate({scrollTop: $(".chat-main__messages")[0].scrollHeight});
      })
      .fail(function () {
        alert("メッセージを入力してください");
        $(".form__submit").prop("disabled", false);
      })
  })
});