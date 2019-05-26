// The name of the file will appear on select
$(".custom-file-input").on("change", function() {
    var fileName = $(this).val().split("\\").pop();
    // $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
    $(this).siblings(".custom-file-label").html("New file added");
});