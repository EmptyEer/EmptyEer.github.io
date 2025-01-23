document.addEventListener('DOMContentLoaded', () => {
  const $searchInput = $('#search-input')
  $searchInput.on('input', function (e) {
    console.log(e)
  })
})
