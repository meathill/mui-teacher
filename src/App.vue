<template lang="pug">
#app
  #nav
    router-link(to="/") Home
    span.mx-2 |
    router-link(to="/about") About

  router-view
</template>
