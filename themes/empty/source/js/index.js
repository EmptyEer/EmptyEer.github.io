
function clickListItem(element) {
  if(!$(element).hasClass('empty-item-name-active')) {
    $('.empty-item-name').removeClass('empty-item-name-active')
    $(element).addClass('empty-item-name-active');
  }
}
function clickItemIcon(event, subListId) {
  event.stopPropagation();
  if($(`#${subListId}`)) {
    $(`#${subListId}`).fadeIn()
  }
  console.log(element)
}
