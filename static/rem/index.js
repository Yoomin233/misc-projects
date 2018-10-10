import "./style.css";
// (function() {
// if (process.env.NODE_ENV !== "production") {
//   const connection = new WebSocket("ws://localhost:8888");
//   connection.addEventListener("open", e => {
//     console.log("dev ws connected!");
//   });
//   connection.addEventListener("message", e => {
//     if (event.data === "file changed") {
//       setTimeout(location.reload.bind(location), 500);
//     }
//   });
// }
setTimeout(() => console.log("hehda!"));
console.log(process.env.NODE_ENV);
// })();
