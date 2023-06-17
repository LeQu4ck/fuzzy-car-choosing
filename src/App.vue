<template>
  <MenuBar class="navBarStyle" style="border: 0px">
    <template #start>
      <img alt="logo" src="@/assets/fuzzy-car-choice-logo.png" height="200" class="m-0 p-0" />
    </template>
  </MenuBar>
  <TabView class="mt-4">
    <TabPanel color="accent">
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
  background: rgb(0, 97, 232);
  background: linear-gradient(
    180deg,
    rgba(0, 97, 232, 1) 0%,
    rgba(191, 0, 165, 1) 91%,
    rgba(255, 45, 123, 0.7) 100%
  );
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
}
</style>
