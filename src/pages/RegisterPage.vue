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
      <button type="button" @click="goBackButton" class="backBtn border-0 bg-white p-0">
        <img src="@/assets/Back.png" alt="back">
      </button>

      <form id="regForm" class="text-center p-2">
        <h1 class="fw-bold">Xush kelibsiz !</h1>
        <p class="opacity-50">Ro'yxatdan o'tish</p>

        <div class="d-flex justify-content-center">
          <div class="step activeStep rounded-circle"></div>
          <div class="step rounded-circle"></div>
        </div>

        <div id="firstTab" v-if="isFirstTab" class="tab">
          <div class="d-flex pt-4">
            <div class="pe-2">
              <label class="fw-semibold d-flex pb-2">Ism*</label>
              <input type="text" placeholder="Abduvali" class="p-3 nameInput border rounded-4 w-100" required>
            </div>

            <div class="ps-2">
              <label class="fw-semibold d-flex pb-2">Familiya*</label>
              <input type="text" placeholder="Karimov" class="p-3 border rounded-4 w-100" required>
            </div>
          </div>

          <div class="pt-4">
            <label class="fw-semibold d-flex me-auto pb-2">Tug'ilgan kun*</label>
            <input type="date" class="p-3 border rounded-4 w-100" required>
          </div>

          <div class="pt-4">
            <label class="fw-semibold d-flex pb-2">Jins*</label>
            <div class="d-flex">
              <div class="border form-check rounded-4 me-2 d-flex p-3 w-100">
                <input type="radio" name="isMaleOption" checked>
                <label for="input" class="fw-semibold ps-2">Erkak</label>
              </div>

              <div class="border form-check rounded-4 ms-2 p-3 d-flex w-100">
                <input type="radio" name="isMaleOption">
                <label for="input" class="fw-semibold ps-2">Ayol</label>
              </div>
            </div>
          </div>
        </div>

        <div id="secondTab" v-else class="tab">
          <div class="pt-4">
            <label class="fw-semibold d-flex me-auto pb-2">Email*</label>
            <input type="email" placeholder="example@mail.com" class="p-3 border rounded-4 w-100" required>
          </div>

          <div class="pt-4">
            <label class="fw-semibold d-flex me-auto pb-2">Telefon raqam*</label>
            <div class="d-flex">
              <div class="p-3 border border-end-0 rounded-start-4">+998</div>
              <input type="text" placeholder="00-000-00-00" class="p-3 border rounded-end-4 w-100" required>
            </div>
          </div>

          <div class="d-flex pt-4">
            <div class="pe-2">
              <label class="fw-semibold d-flex pb-2">Davlat*</label>
              <select class=" p-3 border rounded-4" aria-label="Default select example">
                <option selected>Uzbekistan</option>
                <option value="1">Usa</option>
                <option value="2">Canada</option>
                <option value="3">Korea</option>
              </select>
            </div>

            <div class="ps-2 ms-auto">
              <label class="fw-semibold d-flex pb-2">Shahar*</label>
              <input type="text" placeholder="Karshi" class="p-3 border rounded-4 w-100" required>
            </div>
          </div>

          <div class="pt-4">
            <label class="fw-semibold d-flex me-auto pb-2">Yangi parol*</label>
            <input type="password" placeholder="Parol" class="p-3 border rounded-4 w-100" required >
          </div>

          <div class="pt-4">
            <label class="fw-semibold d-flex me-auto pb-2">Parolni qaytaring*</label>
            <input type="password" placeholder="Parol" class="p-3 border rounded-4 w-100" required>
          </div>
        </div>

        <p class="pt-4 fw-semibold text-center m-0">
          Ro'yxatdan o'tganmisiz?
          <span><router-link to="/login" class="text-decoration-none">Kirish</router-link></span>
        </p>

        <button
            id="nextPrevBtn"
            @click="changeButtonNextPrev"
            type="button" class="formBtn mt-4 border-0 w-100 text-white rounded-4 p-3">
          {{changeButtonText}}
        </button>

        <button
          id="submitBtn"
          type="submit" v-if="!isFirstTab" class="formBtn mt-4 border-0 w-100 text-white rounded-4 p-3">
          Ro'yhatdan o'tish
        </button>
      </form>

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
  name: "RegisterPage",
  data() {
    return {
      isFirstTab: true,
    }
  },
  computed: {
    changeButtonText() {
      return (this.isFirstTab) ? 'Keyingi' : 'Orqaga'
    }
  },
  methods: {
    changeButtonNextPrev() {
      this.isFirstTab ? this.isFirstTab = false : this.isFirstTab = true
      this.changeStepColor()
    },
    changeStepColor() {
      const step = document.querySelectorAll('.step')
      if (this.isFirstTab) {
        step[0].classList.add('activeStep')
        step[1].classList.remove('activeStep')
      } else {
        step[1].classList.add('activeStep')
        step[0].classList.remove('activeStep')
      }
    },
    goBackButton() {
      if (this.isFirstTab) {
        this.$router.push('/')
      } else {
        this.changeButtonNextPrev()
      }

    },
  }
  // methods: {
  //   changeNextPrev() { // todo: there is bag in validation
  //     const firstTab = document.querySelector("#firstTab")
  //     const secondTab = document.querySelector("#secondTab")
  //     const firstTabInput = firstTab.querySelectorAll("input")
  //     const submitBtn = document.querySelector("#submitBtn")
  //     const step = document.querySelectorAll(".step")
  //     const nextPrevBtn = document.querySelector("#nextPrevBtn")
  //
  //     firstTabInput.forEach(element => {
  //
  //       if(element.value === "" || element.value === null) {
  //         element.classList.add('invalid')
  //
  //       } else {
  //         element.classList.remove('invalid')
  //         secondTab.classList.toggle('hideElem')
  //         firstTab.classList.toggle('hideElem')
  //         submitBtn.classList.toggle('hideElem')
  //         step[0].classList.toggle('activeStep')
  //         step[1].classList.toggle('activeStep')
  //       }
  //     })
  //
  //     if(firstTab.className !== "tab") {
  //       nextPrevBtn.innerHTML = "Orqaga"
  //     } else {
  //       nextPrevBtn.innerHTML = "Keyingi"
  //     }
  //   },
  //   validateInput() {
  //     const secondTab = document.querySelector("#secondTab")
  //     const secondTabInput = secondTab.querySelectorAll("input")
  //
  //     secondTabInput.forEach(element => {
  //       if(element.value === "" || element.value === null) {
  //         element.classList.add('invalid')
  //       } else {
  //         element.classList.remove('invalid')
  //       }
  //     })
  //   },
  // },
}

</script>

<style scoped>
.hideElem {
  display: none;
}
.invalid {
  background-color:rgba(255, 99, 99, 0.321);
}
</style>