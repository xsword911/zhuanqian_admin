<script>
export default {
  name: "Redirect",
  created() {
    // this.$route  当前路由
    // let { foo, bar } = { foo: 'aaa', bar: 'bbb' };
    // foo = "aaa"
    // bar = "bbb"
    const { params, query } = this.$route;
    const { path } = params;
    console.log(this.$route);
    // this.$router.replace  跳转到指定的url，但是这个方法不会向history里面添加新的记录，点击返回，会跳转到上上一个页面。上一个记录是不存在的。
    this.$router.replace({ path: "/" + path, query });
  },
  render: function (h) {
    return h();
  },
};
</script>
