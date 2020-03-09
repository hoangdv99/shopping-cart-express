
$(function(){
    if($('textarea#ta').length){
        CKEDITOR.replace('ta');
    }
    $('a.confirmDelete').on('click', function(){
        if(!confirm('Confirm deletion'))
            return false;
    })
    if($('[data-fancybox="gallery"]'))
        $('[data-fancybox="gallery"]').fancybox();
})

