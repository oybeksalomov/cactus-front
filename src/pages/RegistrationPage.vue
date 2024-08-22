<template>
    <div id="register" class="mainContainer bg-white position-relative">
        <div id="bgImage" class="bgImage position-absolute top-0 start-0">
            <div class="h-100 bg-dark opacity-50"></div>
        </div>
        <div
            id="bgContainer"
            class="bgContainer p-3 bg-white rounded-top-5 position-relative
            position-absolute bottom-0 start-50 translate-middle-x"
        >
            <Form id="regForm" class="text-center p-2" @submit="auth">
                <h1 class="fw-bold">{{ $t('welcome') }}</h1>
                <p class="opacity-50">{{ $t('registration') }}</p>
                <div class="col-12 mt-3" v-if="isUniqueEmailError">
                    <div class="alert alert-danger form-control rounded-4">{{ $t('isEmail') }}</div>
                </div>
                <div id="firstTab" class="tab">
                    <div class="d-flex pt-4">
                        <div class="pe-2">
                            <label class="fw-semibold d-flex pb-2">
                                {{$t('name')}}*
                            </label>
                            <Field
                                type="text"
                                name="firstName"
                                :placeholder="$t('name')"
                                class="p-3 nameInput border rounded-4 w-100"
                                v-model="form.givenName"
                                :rules="validateFirstName"
                            />
                            <ErrorMessage class="errorMsg d-flex me-auto" name="firstName"></ErrorMessage>
                        </div>

                        <div class="ps-2">
                            <label class="fw-semibold d-flex pb-2">
                                {{ $t('lastname') }}*
                            </label>
                            <Field
                                type="text"
                                :placeholder="$t('lastname')"
                                class="p-3 border rounded-4 w-100"
                                v-model="form.familyName"
                                name="lastName"
                                :rules="validateLastName"
                            />
                            <ErrorMessage class="errorMsg d-flex me-auto" name="lastName"></ErrorMessage>
                        </div>
                    </div>
                </div>

                <div id="secondTab" class="tab">
                    <div class="pt-4">
                        <label class="fw-semibold d-flex me-auto pb-2">{{ $t('email') }}*</label>
                        <Field
                            type="email"
                            placeholder="example@mail.com"
                            class="p-3 border rounded-4 w-100"
                            autocomplete="email"
                            v-model="form.email"
                            name="email"
                            :rules="validateEmail"
                        />
                        <ErrorMessage class="errorMsg d-flex me-auto" name="email"></ErrorMessage>
                    </div>

                    <div class="pt-4">
                        <label class="fw-semibold d-flex me-auto pb-2">{{$t('password')}}*</label>
                        <Field
                            type="password"
                            :placeholder="$t('password')"
                            class="p-3 border rounded-4 w-100"
                            autocomplete="password"
                            v-model="form.password"
                            name="password"
                            :rules="validatePassword"
                        />
                        <ErrorMessage class="errorMsg d-flex me-auto" name="password"></ErrorMessage>
                    </div>

                    <div class="pt-4">
                        <label class="fw-semibold d-flex me-auto pb-2">{{ $t('repeatPassword') }}*</label>
                        <Field
                            type="password"
                            :placeholder="$t('repeatPassword')"
                            class="p-3 border rounded-4 w-100"
                            autocomplete="password"
                            v-model="form.password2"
                            name="password2"
                            :rules="validateRepeatPassword"
                        />
                        <ErrorMessage class="errorMsg d-flex me-auto" name="password2"></ErrorMessage>
                    </div>
                </div>

                <p class="pt-4 fw-semibold text-center m-0">
                    {{ $t('areYouRegistered') }}
                    <span>
                        <router-link to="/login" class="text-decoration-none">
                           {{ $t('enter') }}
                        </router-link>
                    </span>
                    <span class="select-lang"><SwitcherLanguage/></span>
                </p>

                <div>
                    <div class="btn submit text-light fw-bold py-3" v-if="isLoading">
                        <span
                            aria-hidden="true"
                            class="spinner-border spinner-border-sm text-secondary"
                            role="status"
                        />
                    </div>
                    <button
                        v-else
                        class="formBtn mt-4 border-0 w-100 text-white rounded-4 p-3"
                        :disabled="!isComplete"
                    >
                        {{ $t('registration') }}
                    </button>
                </div>
            </Form>
            <div class="cactusLogo pb-4 text-center">
                <router-link to="/">
                    <img src="@/components/assets/Cactus.png" alt="Cactus Logo">
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import SwitcherLanguage from "@/components/SwitcherLanguege.vue";
import validateForm from "@/mixins/validateForm";
import {ErrorMessage, Form, Field} from "vee-validate";

export default {
    name: "RegisterPage",
    components: {SwitcherLanguage, Form, Field, ErrorMessage},
    data() {
        return {
            form: {
                givenName: '',
                familyName: '',
                picture: '/api/media_objects/1',
                city: '',
                email: '',
                password: '',
                password2: ''
            },
            unique: {
                email: ''
            },
            isUniqueEmailError: false,
            isLoading: false,

        }
    },
    mixins: [validateForm],
    computed: {
        ...mapGetters(['getIsUniqueEmail']),
        isEqualPassword() {
            return this.form.password === this.form.password2 && this.form.password !== ''
        },
        isComplete() {
            return !!(
                this.form.givenName &&
                this.form.familyName &&
                this.form.email &&
                this.form.password &&
                this.isEqualPassword
            )
        }
    },
    methods: {
        ...mapActions(['pushUser', 'pushIsUniqueEmail', 'fetchToken']),

        fetchLocation() {
            fetch('https://get.geojs.io/v1/ip/geo.json')
                .then((res) => res.json())
                .then((res) => {
                    this.form.city = res.city
                })
        },
        auth() {
            if (this.form.email.match(/^[a-z0-9]+([._-]?[a-z0-9]+)*@[a-z0-9]+([-_]?[a-z0-9]+)?\.[a-z0-9]+$/)) {
                this.unique.email = this.form.email
                this.pushIsUniqueEmail(this.unique)
                    .then(() => {
                        this.createUser()
                    })
            }
        },
        createUser() {
            if(this.getIsUniqueEmail) {
                this.isUniqueEmailError = false
                this.isLoading = true
                this.pushUser(this.form)
                    .then(() => {
                        this.fetchToken({email: this.form.email, password: this.form.password})
                            .then(() => {
                                this.$router.push('/')
                            })
                    })
            } else {
                this.isUniqueEmailError = true
            }
        },
        validateRepeatPassword(value) {
            if(!value) {
                return 'This field is required';
            } else if(!this.isEqualPassword) {
                return 'Password is not equal';
            }
            return true;
        },
    },
    mounted() {
        this.fetchLocation()

    }
}

</script>

<style scoped>
.form-control {
    padding: 14px;
}

.select-lang {
    margin-left: 1rem;
}
</style>
