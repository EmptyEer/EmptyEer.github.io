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
