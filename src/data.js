let avatars = [
  { username: "Ha", passcode: null, imageUrl: "/img/blue.jpg" },
  { username: "Tam", passcode: "1234", imageUrl: "/img/blueangry.jpg" },
  { username: "Duong", passcode: "9999", imageUrl: "/img/green.jpg" },
  { username: "Thu", passcode: null, imageUrl: "/img/navi.jpg" },
  { username: "Lien", passcode: null, imageUrl: "/img/violet.jpg" },
];

export function getAvatars() {
  return avatars;
}

export function getPasscode(username) {
  let avatar = avatars.find((avatar) => avatar.username === username);
  return avatar["passcode"];
}
