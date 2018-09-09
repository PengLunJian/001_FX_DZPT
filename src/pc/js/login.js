require(['jquery', 'common', 'template', 'apiMain'], function ($, common, template, apiMain) {
    /**
     *
     * @constructor
     */
    function LoginPage() {
        var args = arguments.length ? arguments.length[0] : arguments;
        this.username = args['username'] ? args['username'] : '#username';
        this.password = args['password'] ? args['password'] : '#password';
        this.container = args['container'] ? args['container'] : '.login';
        this.btnLogin = args['btnLogin'] ? args['btnLogin'] : '.btn-login';

        this.init();
    }

    /**
     *
     * @returns {LoginPage}
     */
    LoginPage.prototype.init = function () {
        this.submit();
        return this;
    };
    /**
     *
     * @returns {boolean}
     */
    LoginPage.prototype.notNullCheck = function () {
        var result = false;
        var MessageBox = common.MessageBox;
        var MessageBoxIcons = MessageBox.MessageBoxIcons;
        var MessageBoxButtons = MessageBox.MessageBoxButtons;
        if (!$(this.username).val().trim()) {
            MessageBox.show('提示', '用户名不能为空 !', MessageBoxButtons.OK, MessageBoxIcons.INFORMATION);
        } else if (!$(this.password).val().trim()) {
            MessageBox.show('提示', '密码不能为空 !', MessageBoxButtons.OK, MessageBoxIcons.INFORMATION);
        } else {
            result = true;
        }
        MessageBox = null;
        return result;
    };
    /**
     *
     * @returns {LoginPage}
     */
    LoginPage.prototype.ajaxRequestCheck = function () {
        var _this = this;
        var data = 'username=' + $(_this.username).val()
            + '&password=' + $(_this.password).val();
        var MessageBox = common.MessageBox;
        var MessageBoxIcons = MessageBox.MessageBoxIcons;
        var MessageBoxButtons = MessageBox.MessageBoxButtons;
        $.ajax({
            url: apiMain.login.url,
            data: data,
            type: 'POST',
            processData: false,
            $renderContainer: $(_this.container),
            contentType: 'application/x-www-form-urlencoded',
            success: function (data) {
                if (data.status === this.SUCCESS_NO) {
                    window.location.href = 'index.html';
                } else {
                    MessageBox.show('错误', '用户名或密码错误 !', MessageBoxButtons.OK, MessageBoxIcons.ERROR);
                }
            },
            error: function (msg) {
                console.log(this.ERROR_NO);
                MessageBox.show('错误', '请求失败了 !', MessageBoxButtons.OK, MessageBoxIcons.ERROR);
            }
        });
        return this;
    };
    /**
     *
     * @returns {LoginPage}
     */
    LoginPage.prototype.submit = function () {
        var _this = this;
        $(document).on('click', this.btnLogin, function () {
            if (_this.notNullCheck()) {
                _this.ajaxRequestCheck();
            }
        });
        return this;
    };
    /**
     *
     * @type {LoginPage}
     */
    var login = new LoginPage();

});
