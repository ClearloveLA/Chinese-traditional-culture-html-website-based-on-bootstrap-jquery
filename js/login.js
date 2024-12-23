$(document).ready(function() {
    const loginForm = $('#loginForm');
    const registerForm = $('#registerForm');
    const formHeader = $('.form-header');
    let isLoginForm = true;

    // 使用事件委托来处理动态生成的元素
    $(document).on('click', '#switchBtn', function(e) {
        e.preventDefault();
        if (isLoginForm) {
            // 切换到注册表单
            loginForm.addClass('slide-up').fadeOut(300, function() {
                registerForm.removeClass('d-none').addClass('slide-down').fadeIn(300);
                formHeader.find('h2').text('创建账号');
                formHeader.find('p').text('注册一个新账号');
                $('.register-link p').html('已有账号? <a href="#" id="switchBtn">立即登录</a>');
            });
        } else {
            // 切换到登录表单
            registerForm.addClass('slide-up').fadeOut(300, function() {
                loginForm.removeClass('d-none').addClass('slide-down').fadeIn(300);
                formHeader.find('h2').text('欢迎回来');
                formHeader.find('p').text('登录您的账号以继续');
                $('.register-link p').html('没有账号? <a href="#" id="switchBtn">立即注册</a>');
            });
        }
        isLoginForm = !isLoginForm;
    });

    // 登录表单验证
    loginForm.submit(function(e) {
        e.preventDefault();
        let isValid = true;
        
        const username = $('#loginUsername').val().trim();
        const password = $('#loginPassword').val();

        if (username === '') {
            showError($('#loginUsername'), '请输入用户名');
            isValid = false;
        }
        if (password === '') {
            showError($('#loginPassword'), '请输入密码');
            isValid = false;
        }

        if (isValid) {
            // 登录成功后直接跳转到首页
            window.location.href = 'index.html';
        }
    });

    // 注册表单验证
    registerForm.submit(function(e) {
        e.preventDefault();
        let isValid = true;
        
        const username = $('#registerUsername').val().trim();
        const email = $('#registerEmail').val().trim();
        const password = $('#registerPassword').val();

        if (username === '') {
            showError($('#registerUsername'), '请输入用户名');
            isValid = false;
        }
        if (email === '') {
            showError($('#registerEmail'), '请输入邮箱');
            isValid = false;
        }
        if (password === '') {
            showError($('#registerPassword'), '请输入密码');
            isValid = false;
        }

        if (isValid) {
            alert('注册成功！请登录您的账号');
            // 注册成功后自动切换到登录表单
            if (!isLoginForm) {
                $('#switchBtn').click();
            }
        }
    });

    // 显示错误信息
    function showError(input, message) {
        const formControl = input.parent();
        formControl.addClass('error');
        const small = formControl.find('small');
        if (small.length === 0) {
            formControl.append(`<small class="error-message">${message}</small>`);
        } else {
            small.text(message);
        }
    }

    // 清除错误信息
    $('.input-box input').focus(function() {
        $(this).parent().removeClass('error');
        $(this).parent().find('small').remove();
    });
}); 