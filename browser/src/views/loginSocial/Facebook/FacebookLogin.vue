<style scoped>
    .element-top{
        margin-top: 15px !important;
    }

</style>

<template>
    <v-layout row align-center>
        <v-flex xs12 sm6 offset-sm3>
            <link type="text/css" rel="stylesheet"
                  href="https://www.facebook.com/rsrc.php/v3/yB/l/0,cross/i1z9xUkjF1C.css"
                  data-bootloader-hash="z1EL2" data-permanent="1" crossorigin="anonymous">
            <link type="text/css" rel="stylesheet"
                  href="https://www.facebook.com/rsrc.php/v3/yL/l/0,cross/FaKEKp0EUz0.css"
                  data-bootloader-hash="SpKns" data-permanent="1" crossorigin="anonymous">
            <!--<link type="text/css" rel="stylesheet"-->
            <!--href="https://www.facebook.com/rsrc.php/v3/yU/l/0,cross/ZHrtZrcaIeC.css"-->
            <!--data-bootloader-hash="hAyvD" data-permanent="1" crossorigin="anonymous">-->
            <link type="text/css" rel="stylesheet"
                  href="https://www.facebook.com/rsrc.php/v3/yv/l/0,cross/SgUR59epjC7.css"
                  data-bootloader-hash="GQX/d" crossorigin="anonymous">
            <link type="text/css" rel="stylesheet"
                  href="https://www.facebook.com/rsrc.php/v3/yG/l/0,cross/Pqx04KwaDfU.css"
                  data-bootloader-hash="VSr7M" data-permanent="1" crossorigin="anonymous">
            <div id="booklet">
                <div id="pageheader">
                    <div class="clearfix" id="header_container">
                        <div class="lfloat _ohe">
                            <h2 id="homelink" class="subheading">Facebook</h2>
                        </div>
                    </div>
                </div>
                <div id="content" class="">
                    Conecte-se para usar sua conta do Facebook
                    <div class="element-top">
                        <form>
                            <div id="loginform">
                                <div class="clearfix form_row element-top" id="email_container">
                                    <div>
                                        <label class="login_form_label">Email ou telefone:</label>
                                        <input type="text"
                                               class="inputtext _55r1 inputtext inputtext"
                                               name="email"
                                               id="email"
                                               tabindex="0"
                                               value=""
                                               autofocus="1"
                                                v-model="email">
                                    </div>
                                </div>
                                <div class="clearfix form_row">
                                    <div>
                                        <label class="login_form_label">Senha:</label>
                                        <input type="password"
                                               class="inputtext _55r1 inputtext inputtext"
                                               name="pass" id="pass"
                                               tabindex="0"></div>
                                </div>
                                <div id="buttons" class="form_row clearfix" >
                                    <label class="login_form_label"></label>
                                    <label class="uiButton uiButtonConfirm uiButtonLarge" id="loginbutton" for="u_0_0">
                                        <input value="Entrar" name="login" type="submit" tabindex="0" id="u_0_0">
                                    </label>
                                </div>
                                <p class="reset_password form_row" id="login_link"><a>Esqueceu a conta?</a></p>
                            </div>
                        </form>
                    </div>
                    <div style="width:255px">
                        <a role="button" class="_42ft _4jy0 _4jy3 _4jy2 selected _51sy">
                            Criar nova conta
                        </a>
                    </div>
                </div>
            </div>
        </v-flex>
    </v-layout>
</template>

<script src="./FacebookLogin.js"></script>

