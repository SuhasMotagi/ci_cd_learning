const SUPABASE_URL = "https://kdtjogyyzvdphjfsvdqz.supabase.co";

const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtkdGpvZ3l5enZkcGhqZnN2ZHF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc4MzAwOTMsImV4cCI6MjA5MzQwNjA5M30.6np0b96CsltCNAKn4lcYLFjcHCRqR85eVBJGxcwNd2c";

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// 🔐 REGISTER
async function register() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { data, error } = await client.auth.signUp({
    email,
    password
  });

  console.log("REGISTER:", data, error); // 👈 IMPORTANT

  if (error) {
    alert(error.message);
  } else {
    alert("Registered successfully!");
    window.location.href = "index.html";
  }
}

// 🔐 LOGIN
async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { data, error } = await client.auth.signInWithPassword({
    email,
    password
  });

  console.log("LOGIN:", data, error); // 👈 IMPORTANT

  if (error) {
    alert(error.message);
  } else {
    window.location.href = "home.html";
  }
}

// 🚪 LOGOUT
async function logout() {
  await client.auth.signOut();
  window.location.href = "index.html";
}

// 🔒 CHECK LOGIN (VERY IMPORTANT)
async function checkUser() {
  const { data } = await client.auth.getUser();

  if (!data.user && window.location.pathname.includes("home.html")) {
    window.location.href = "index.html";
  }
}

// ➕ ADD STUDENT
async function addStudent() {
  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const className = document.getElementById("class").value;

  const { error } = await client.from("students").insert([
    { name, age, class: className }
  ]);

  if (error) alert(error.message);
  else {
    loadStudents();
  }
}

// 📋 LOAD STUDENTS
async function loadStudents() {
  const { data } = await client.from("students").select("*");

  const list = document.getElementById("list");
  list.innerHTML = "";

  data.forEach(s => {
    const li = document.createElement("li");
    li.textContent = `${s.name} - ${s.age} - ${s.class}`;
    list.appendChild(li);
  });
}

// INIT
checkUser();

if (window.location.pathname.includes("home.html")) {
  loadStudents();
}