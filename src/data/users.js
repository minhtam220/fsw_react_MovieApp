let users = [
  { username: "Ha", passcode: null, imageUrl: "/img/blue.jpg" },
  { username: "Tam", passcode: "1234", imageUrl: "/img/blueangry.jpg" },
  { username: "Duong", passcode: "9999", imageUrl: "/img/green.jpg" },
  { username: "Thu", passcode: null, imageUrl: "/img/navi.jpg" },
  { username: "Lien", passcode: null, imageUrl: "/img/violet.jpg" },
];

export function getUsers() {
  return users;
}

export function getPasscodeByUsername(username) {
  let user = users.find((user) => user.username === username);
  return user["passcode"];
}
