<template>
  <MenuBar class="navBarStyle" style="border: 0px">
    <template #start>
      <img alt="logo" src="@/assets/fuzzy-car-choice-logo.png" height="200" class="m-0 p-0" />
    </template>
  </MenuBar>

  <TabView class="mt-4 flex flex-column align-items-center">
    <TabPanel>
      <template #header>
        <i class="pi pi-book mr-2"></i>
        <span>Documentație</span>
      </template>
      <p>sdfnjsd</p>
    </TabPanel>

    <TabPanel>
      <template #header>
        <i class="pi pi-calculator mr-2"></i>
        <span>Model</span>
      </template>
    </TabPanel>
  </TabView>
</template>

<script setup></script>

<style scoped>
.navBarStyle {
  background-color: transparent;
}
</style>

<style>
body {
  background: rgb(0, 0, 0);
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 1) 25%,
    rgba(0, 255, 0, 0.9) 63%,
    rgba(2, 206, 1, 1) 80%,
    rgba(8, 4, 4, 1) 100%
  );

  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
}
</style>
