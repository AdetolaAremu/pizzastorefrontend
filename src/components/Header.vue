<template>
  <div>
    <label
      for="menu-open"
      class="absolute right-2 bottom-2 shadow-lg rounded-full p-2 bg-gray-100 text-gray-600 md:hidden"
      data-dev-hint="floating action button"
    >
      <svg
        class="h-6 w-6"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </label>
    <header
      class="bg-gray-600 text-gray-100 flex justify-between md:hidden"
      data-dev-hint="mobile menu bar"
    >
      <a
        href="#"
        class="block p-4 text-white font-bold whitespace-nowrap truncate"
      >
        Peeza
      </a>

      <label
        for="menu-open"
        id="mobile-menu-button"
        class="m-2 p-2 focus:outline-none hover:text-white hover:bg-gray-700 rounded-md"
      >
        <svg
          id="menu-open-icon"
          class="h-6 w-6 transition duration-200 ease-in-out"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
        <svg
          id="menu-close-icon"
          class="h-6 w-6 transition duration-200 ease-in-out"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </label>
    </header>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
