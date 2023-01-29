<template>
  <div id="login" class="mainContainer bg-white position-relative">

    <div id="bgImage" class="bgImage position-absolute top-0 start-0">
      <div class="h-100 bg-dark opacity-50"></div>

    </div>

    <div
      id="bgContainer"
      class="bgContainer p-3 bg-white rounded-top-5 position-absolute bottom-0 start-50 translate-middle-x"
    >
      <button type="button" class="backBtn border-0 bg-white p-0">
        <img src="@/assets/Back.png" alt="back">
      </button>

      <form class="text-center p-2">
        <h1 class="fw-bold">Kirish</h1>
        <p class="opacity-50">Xush kelibsiz!</p>

        <div class="pt-4">
          <label class="fw-semibold d-flex me-auto pb-2">Foydalanuvchi ismi yoki email</label>
          <input type="text" placeholder="example@mail.com" class="p-3 border rounded-4 w-100" required>
        </div>

        <div class="pt-4">
          <label class="fw-semibold d-flex me-auto pb-2">
            Parol
            <span class="ms-auto"><a href="#" class="text-decoration-none">Parolni unutdingizmi?</a></span></label>
          <input type="password" placeholder="Parolni" class="p-3 border rounded-4 w-100" required>
        </div>

        <div class="pt-4">
          <button type="submit" class="formBtn border-0 w-100 text-white rounded-4 p-3">Kirish</button>
        </div>
      </form>

      <p class="pt-4 fw-semibold text-center">
        Ro'yxatdan o'tganmisiz?
        <span><router-link to="/register" class="text-decoration-none">Ro'yxatdan o'tish</router-link></span>
      </p>
      <div class="cactusLogo pb-4 text-center">
        <a href="./index.html">
          <img src="@/assets/Cactus.png" alt="Cactus Logo">
        </a>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "LoginPage"
}
</script>

<style scoped>

</style>