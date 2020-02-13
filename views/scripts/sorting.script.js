$('tbody').sortable({
    item: "tr:not('.home')",
    placeholder: "ui-state-hightlight",
    update: function(){
      var ids = $('tbody').sortable("serialize");
      var url = "/admin/page/reorder-pages";
      $.post(url, ids);
    }
  })