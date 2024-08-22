<template>
    <div id="login" class="mainContainer bg-white position-relative">
        <div id="bgImage" class="bgImage position-absolute top-0 start-0">
            <div class="h-100 bg-dark opacity-50"></div>
        </div>
        <div
            id="bgContainer"
            class="bgContainer p-3 bg-white rounded-top-5 position-absolute bottom-0 start-50 translate-middle-x"
        >
            <Form class="text-center p-2" @submit="auth">
                <h1 class="fw-bold">{{ $t('enter') }}</h1>
                <p class="opacity-50">{{ $t('welcome') }}</p>

                <div class="col-12 mt-3" v-if="isLoginError">
                    <div class="alert alert-danger form-control">{{$t('noRegistered')}}</div>
                </div>

                <div class="pt-4">
                    <label class="fw-semibold d-flex me-auto pb-2">{{ $t('usernameOrEmail') }}</label>
                    <Field
                        type="email"
                        name="email"
                        placeholder="example@mail.com"
                        class="p-3 border rounded-4 w-100"
                        autocomplete="email"
                        v-model="form.email"
                        :rules="validateEmail"
                    />
                    <ErrorMessage class="errorMsg d-flex me-auto" name="email"></ErrorMessage>
                </div>

                <div class="pt-4">
                    <label class="fw-semibold d-flex me-auto pb-2">{{$t('password')}}
                        <span class="ms-auto"><a href="#" class="text-decoration-none">{{ $t('forgotPassword') }}</a></span>
                    </label>
                    <Field
                        type="password"
                        name="password"
                        :placeholder="$t('password')"
                        class="p-3 border rounded-4 w-100"
                        autocomplete="password"
                        v-model="form.password"
                        :rules="validatePassword"
                    />
                    <ErrorMessage class="errorMsg d-flex me-auto" name="password"></ErrorMessage>
                </div>

                <div class="pt-4">
                    <button
                        class="formBtn border-0 w-100 text-white rounded-4 p-3"
                        :disabled="!isComplete"
                    >
                        {{ $t('enter') }}
                    </button>
                </div>
            </Form>

            <p class="pt-4 fw-semibold text-center">
                {{ $t('areYouRegistered') }}
                <span><router-link to="register" class="text-decoration-none">{{ $t('registration') }}</router-link></span>
                <span class="select-lang">
                    <SwitcherLanguage/>
                </span>
            </p>
            <div class="cactusLogo pb-4 text-center">
                <a href="/">
                    <img src="../components/assets/Cactus.png" alt="Cactus Logo">
                </a>
            </div>
        </div>
    </div>
</template>

<script>

import {mapActions} from "vuex";
import SwitcherLanguage from "@/components/SwitcherLanguege.vue";
import {ErrorMessage, Field, Form} from "vee-validate";
import validateForm from "@/mixins/validateForm";

export default {
    name: 'LoginPage',
    components: {
        SwitcherLanguage,
        Form,
        Field,
        ErrorMessage,
    },
    computed: {
        isComplete() {
            return !!(
                this.form.email &&
                this.form.password
            )
        }
    },
    mixins: [validateForm],
    data() {
        return {
            form: {
                email: '',
                password: '',
            },
            isLoginError: false,
        }
    },
    methods: {
        ...mapActions(['fetchToken']),

        auth() {
            this.fetchToken(this.form)
                .then(() => {
                    console.log('token oldi')
                    this.$router.push('/')
                })
                .catch(() => {
                    this.isLoginError = true
                })
        },

    },
}
</script>

<style scoped>
.select-lang {
    margin-left: 1rem;
}
</style>
