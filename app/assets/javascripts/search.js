$(function() {
  var user_list = $("#user-search-result");
  var member_list = $(".chat-group-user__name")

  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
                </div>`;
    user_list.append(html);
  };

  function appendNoUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user}</p>
                </div>`;
    user_list.append(html);
  };

  function buildAddedUser(id, name) {
    var html = `<div class="chat-group-user clearfix js-chat-member" id="chat-group-user-${id}">
                  <input name="group[user_ids][]" type="hidden" value="${id}">
                  <p class="chat-group-user__name">${name}</p>
                  <a class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn">削除</a>
                </div>`;
    return html;
  }




  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    $.ajax({
      type: "GET",
      url: "/users",
      data: {keyword: input},
      dataType: "json"
    })
    .done(function(users) {
      $("#user-search-result").empty();
      if (users.length !== 0 && input.length !== 0) {
        users.forEach(function(user) {
          appendUser(user);
        });
      } else if(input.length === 0) {
        appendNoUser("")
      } else {
        appendNoUser("一致するユーザーはいません")
      }
    })
    .fail(function() {
      alert("ユーザー検索に失敗しました")
    });
  });

  

  $(document).on('click', '.user-search-add', function() {
    var id = $(this).data('user-id');
    var name = $(this).data('user-name');
    var added_user = buildAddedUser(id, name);
    $('.chat-group-users').append(added_user);
    $(this).parent('.chat-group-user').remove();
  });

  $(document).on('click', '.user-search-remove', function () {
    $(this).parent().remove()
  });

  // $(document).on('click', '.user-search-remove', function() {
  //   var id = $(this).data('user-id');
  //   $(`#chat-group-user-${id}`).remove();
  // });
});