<template>
  <div class="footer">
    <span>Copyright @2024</span>
    <a href="https://beian.miit.gov.cn" target="_blank" style="margin: 0 15px"
      >蜀ICP备2023009323号-2</a
    >
    <div
      style="
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 10px;
      "
    >
      <img
        src="https://pic.webgishome.com/common/police_beian.png"
        style="width: 20px; margin-right: 5px"
      />
      <a
        href="https://beian.mps.gov.cn/#/query/webSearch?code=51010602002313"
        rel="noreferrer"
        target="_blank"
        >川公网安备51010602002313</a
      >
    </div>
  </div>
</template>
<script setup lang="ts"></script>
<style lang="scss">
.footer {
  background-color: black;
  color: gray;
  padding: 40px 0;
  text-align: center;
  font-size: 14px;
}

a {
  color: gray;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    color: rgb(220, 220, 220);
  }
}
</style>
