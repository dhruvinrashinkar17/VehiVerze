type User = {
  id: string;
  name: string;
  role: "admin" | "user";
};

const users: User[] = [
  { id: "vehiverze", name: "Vehiverze Admin", role: "admin" },
  { id: "KaifAnsari", name: "Kaif Ansari", role: "user" },
];

export function authenticate(id: string, password: string): User | null {
  if (id === "vehiverze" && password === "9870947889") {
    return users.find((user) => user.id === id) || null;
  } else if (id === "KaifAnsari" && password === "9930687656") {
    return users.find((user) => user.id === id) || null;
  }
  return null;
}

export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null;
  const userId = localStorage.getItem("userId");
  return users.find((user) => user.id === userId) || null;
}

export function login(user: User) {
  if (typeof window === "undefined") return;
  localStorage.setItem("userId", user.id);
}

export function logout() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("userId");
}
