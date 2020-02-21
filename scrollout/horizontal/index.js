console.clear();

new Vue({
  el: "#app",
  data: function () {
    var tabs = [];
    for (var i = 50; i > 20; --i) {
      tabs.push("https://picsum.photos/300/300?image=" + i);
    }

    return {
      tabs: tabs
    };
  },
  mounted: function () {
    ScrollOut({
      scrollingElement: ".flow",
      targets: ".item"
    });
  }
});