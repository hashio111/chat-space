$(function () {


  function buildMessage(message) {
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
      <img class="lower-message__image" src="${message.image}">
    </div>`
    return html;
  }


  $("#new_message").on("click", "submit", function (e) {
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
        $(".chat-main_messages").append(html)
        $("#message_content").val("")
      })
      .fail(function () {
        alert("エラー")
      })
  })
});