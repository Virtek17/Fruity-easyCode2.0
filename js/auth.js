const client = supabase.createClient(
  "https://uuazpgdiggkgcxaylfgl.supabase.co",
  "sb_publishable_Igf2kc4Uv1SH-BaCNGsb6g_LrpVGJrS"
);

const userName = document.getElementById("userName");
const form = document.getElementById("authForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  const user = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    password: formData.get("password"),
  };

  const { data, error } = await client.from("users").insert([user]);

  if (error) {
    console.log("Ошибка: ", error);
  } else {
    console.log("Записано", data);
    userName.textContent = user.name;
    form.reset();
  }
});
