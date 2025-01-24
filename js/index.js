function clickListItem(element) {
  if(!$(element).hasClass('empty-item-name-active')) {
    $('.empty-item-name').removeClass('empty-item-name-active')
    $(element).addClass('empty-item-name-active');
  }
}
function clickItemIcon(event, subListId, element) {
  event.stopPropagation();
  $(element).toggleClass('icon-right')
  $(element).toggleClass('icon-down')
  $(`#${subListId}`).fadeToggle(300)
}
$(function () {
  // 原生toc生成大纲dom排序上有些问题，所以需要手动初始化大纲
  $(".empty-article-outline").html($(".empty-article-outline .toc").clone().append($(".empty-article-outline > .toc-item").clone()));
})
$(document).pjax('a', '.pjax')
