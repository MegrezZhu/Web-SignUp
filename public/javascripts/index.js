/**
 * Created by i4908 on 2016/11/9.
 */

function clearErr(id) {
    //console.log($("#err-info p[name='" + id + "']"));
    $(`input[name="${id}"] + .error-info`)
        .css('opacity', '0')
        .css('transform', 'scaleX(0)');
}

function errHandler(id, flag, msg) {
    if (flag) changeStatus(id, "ok");
    else {
        changeStatus(id, "wrong");
        if (msg) {
            let info = $('input[name="' + id + '"] + .error-info');
            info.text(msg);
            info.css('opacity', '1')
                .css('transform', 'scaleX(1)');
        }
    }
}

function changeStatus(id, status) {
    let _this = $("input[name='" + id + "']");
    _this.attr("status", status);
    if ($('input[status="ok"]').length === 4) {
        $('input[type="submit"]').removeAttr("disabled");
    } else {
        $('input[type="submit"]').attr("disabled", "disabled");
    }
}

function reset() {
    let $ele = $(this);
    $ele.attr("status", "normal");
    clearErr($ele.attr("name"));
}

$(function () {
    let input = $("input[type='text']");
    input.attr("status", "normal");
    input.focus(reset);
    input.blur(function () {
        checkMethod[$(this).attr("name")]($(this).val(), errHandler);
    });
    $('input[type="reset"]').click((function(){
        let $inputs = $('input[type="text"]');
        return function() {
            $inputs.each(reset);
            $('input[type="submit"]').attr("disabled", "disabled");
        };
    })());
});