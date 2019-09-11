<style scoped></style>

<template>
    <v-container>
        <v-layout row align-center>
            <v-flex xs12 sm6>
                <link rel="stylesheet" href="https://abs.twimg.com/a/1533939340/css/t1/twitter_core.bundle.css"
                      class="coreCSSBundles">
                <link rel="stylesheet" class="moreCSSBundles"
                      href="https://abs.twimg.com/a/1533939340/css/t1/twitter_more_1.bundle.css">
                <link rel="stylesheet" class="moreCSSBundles"
                      href="https://abs.twimg.com/a/1533939340/css/t1/twitter_more_2.bundle.css">

                <div class="page-canvas">

                    <div class="signin-wrapper">
                        <h1>Entrar no Twitter</h1>
                        <form class="t1-form clearfix signin js-signin">
                            <fieldset>

                                <legend class="visuallyhidden">Entrar</legend>

                                <div class="clearfix field">
                                    <input class="js-username-field email-input js-initial-focus" type="text"
                                           name="session[username_or_email]" autocomplete="on" value=""
                                           placeholder="Celular, e-mail ou nome de usuário">
                                </div>
                                <div class="clearfix field">
                                    <input class="js-password-field" type="password" name="session[password]"
                                           placeholder="Senha">
                                </div>


                            </fieldset>

                            <div class="captcha">
                            </div>
                            <div class="clearfix">

                                <input type="hidden" name="scribe_log">
                                <input type="hidden" name="redirect_after_login" value="/">
                                <button class="submit EdgeButton EdgeButton--primary EdgeButtom--medium">
                                    Entrar
                                </button>

                                <div class="subchck">
                                    <label class="t1-label remember">
                                        <input type="checkbox" value="1" name="remember_me" checked="checked">
                                        Lembrar-me
                                        <span class="separator">·</span>
                                        <a class="forgot" href="#" rel="noopener">Esqueceu sua senha?</a>
                                    </label>
                                </div>
                            </div>

                        </form>
                    </div>

                    <div class="clearfix mobile has-sms">
                        <p class="signup-helper">
                            Novo no Twitter?
                            <a id="login-signup-link" href="#">Inscreva-se agora »</a>
                        </p>
                        <p class="sms-helper">
                            Já utiliza o Twitter via mensagem de texto?
                            <a href="/account/complete">Ative sua conta »</a>
                        </p>
                    </div>

                </div>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script src="./TwitterLogin.js"></script>


